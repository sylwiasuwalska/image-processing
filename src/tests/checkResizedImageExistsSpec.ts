import mockFs from 'mock-fs';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

import { RESIZED_IMAGES_DIR } from '../consts';
import { checkResizedImageExists } from '../middleware/checkResizedImageExists';

type SendFileFunction = jasmine.Spy<(filePath: string) => void>;

describe('checkResizedImageExists', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    req = {
      query: {
        image: 'testImage',
        width: '100',
        height: '100',
      },
    };
    res = {
      sendFile: jasmine.createSpy('sendFile') as SendFileFunction,
    };
    next = jasmine.createSpy('next');
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should send the resized image if it exists', () => {
    const resizedImageName = 'testImage-100x100.jpg';
    const resizedImagePath = path.join(RESIZED_IMAGES_DIR, resizedImageName);

    mockFs({
      [resizedImagePath]: 'file content here',
    });

    checkResizedImageExists(req as Request, res as Response, next);

    expect(res.sendFile).toHaveBeenCalledWith(resizedImagePath);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next callback when image does not exist', () => {
    mockFs({});

    checkResizedImageExists(req as Request, res as Response, next);

    expect(res.sendFile).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
