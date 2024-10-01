import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { getQueryParams } from '../helpers/getQueryParams';
import { RESIZED_IMAGES_DIR } from '../consts';

export const checkResizedImageExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, width, height } = getQueryParams(req);

  const resizedImageName = `${image}-${width}x${height}.jpg`;
  const resizedImagePath = path.join(RESIZED_IMAGES_DIR, resizedImageName);

  if (fs.existsSync(resizedImagePath)) {
    res.sendFile(resizedImagePath);
  } else {
    (req as any).resizedImagePath = resizedImagePath;
    next();
  }
};
