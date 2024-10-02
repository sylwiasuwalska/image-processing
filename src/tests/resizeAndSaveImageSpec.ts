import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { resizeAndSaveImage } from '../middleware/resizeAndSaveImage';
import { RESIZED_IMAGES_DIR } from '../consts';

interface ResizeReturnType {
  toBuffer: jasmine.Spy<() => Promise<Buffer>>;
}

describe('resizeAndSaveImage', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      query: {
        image: 'test-image',
        width: '100',
        height: '100',
      },
    };
    res = {
      set: jasmine.createSpy('set'),
      send: jasmine.createSpy('send'),
      status: jasmine.createSpy('status').and.returnValue({
        send: jasmine.createSpy('send'),
      }),
    };
    next = jasmine.createSpy('next');
  });

  it('should resize the image and send the buffer', async () => {
    const mockBuffer = Buffer.from('mock image buffer');
    const mockResizeReturnValue: ResizeReturnType = {
      toBuffer: jasmine
        .createSpy('toBuffer')
        .and.returnValue(Promise.resolve(mockBuffer)),
    };

    spyOn(sharp.prototype, 'resize').and.returnValue(mockResizeReturnValue);

    await resizeAndSaveImage(req as Request, res as Response, next);

    expect(sharp.prototype.resize).toHaveBeenCalledWith(100, 100);
    expect(sharp.prototype.resize().toBuffer).toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
    expect(res.send).toHaveBeenCalledWith(mockBuffer);
    expect(next).toHaveBeenCalled();
  });

  it('should make dir and save the resized image to the correct path', async () => {
    const mockBuffer = Buffer.from('mock image buffer');

    const mockResizeReturnValue: ResizeReturnType = {
      toBuffer: jasmine
        .createSpy('toBuffer')
        .and.returnValue(Promise.resolve(mockBuffer)),
    };

    spyOn(sharp.prototype, 'resize').and.returnValue(mockResizeReturnValue);

    await resizeAndSaveImage(req as Request, res as Response, next);

    spyOn(fs, 'existsSync').and.returnValue(false);
    spyOn(fs, 'mkdirSync').and.stub();
    spyOn(fs, 'writeFileSync').and.stub();

    await resizeAndSaveImage(req as Request, res as Response, next);

    const expectedPath = path.join(
      RESIZED_IMAGES_DIR,
      `test-image-100x100.jpg`
    );

    expect(fs.existsSync).toHaveBeenCalledWith(RESIZED_IMAGES_DIR);
    expect(fs.mkdirSync).toHaveBeenCalledWith(RESIZED_IMAGES_DIR, {
      recursive: true,
    });
    expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, mockBuffer);
    expect(res.set).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
    expect(res.send).toHaveBeenCalledWith(mockBuffer);
    expect(next).toHaveBeenCalled();
  });

  it('should handle errors and send a 500 status', async () => {
    const mockResizeReturnValue: ResizeReturnType = {
      toBuffer: jasmine
        .createSpy('toBuffer')
        .and.returnValue(Promise.reject(new Error('Test error'))),
    };

    spyOn(sharp.prototype, 'resize').and.returnValue(mockResizeReturnValue);
    await resizeAndSaveImage(req as Request, res as Response, next);

    expect(sharp.prototype.resize).toHaveBeenCalledWith(100, 100);
    expect(sharp.prototype.resize().toBuffer).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);

    expect(
      (res.status as jasmine.Spy).calls.mostRecent().returnValue.send
    ).toHaveBeenCalledWith('Error resizing image: Error: Test error');
    expect(next).toHaveBeenCalled();
  });
});
