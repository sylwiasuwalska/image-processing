import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import { resizeAndSaveImage } from '../middleware/resizeAndSaveImage';
import { IMAGES_DIR } from '../consts';

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
    spyOn(sharp.prototype, 'resize').and.returnValue({
      toBuffer: jasmine
        .createSpy('toBuffer')
        .and.returnValue(Promise.resolve(mockBuffer)),
    } as any);
    await resizeAndSaveImage(req as Request, res as Response, next);

    expect(sharp.prototype.resize).toHaveBeenCalledWith(100, 100);
    expect(sharp.prototype.resize().toBuffer).toHaveBeenCalled();
    expect(res.set).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
    expect(res.send).toHaveBeenCalledWith(mockBuffer);
    expect(next).toHaveBeenCalled();
  });

  it('should handle errors and send a 500 status', async () => {
    spyOn(sharp.prototype, 'resize').and.returnValue({
      toBuffer: jasmine
        .createSpy('toBuffer')
        .and.returnValue(Promise.reject(new Error('Test error'))),
    } as any);
    await resizeAndSaveImage(req as Request, res as Response, next);

    expect(sharp.prototype.resize).toHaveBeenCalledWith(100, 100);
    expect(sharp.prototype.resize().toBuffer).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);

    expect(
      (res.status as jasmine.Spy).calls.mostRecent().returnValue.send
    ).toHaveBeenCalledWith('Error resizing image.');
    expect(next).toHaveBeenCalled();
  });
});
