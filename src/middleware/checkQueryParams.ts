import { NextFunction, Request, Response } from 'express';
import { getQueryParams } from '../helpers/getQueryParams';
import path from 'path';
import fs from 'fs';
import { FULL_IMAGES_DIR } from '../consts';

export const checkQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { image, width, height } = getQueryParams(req);

  if (!image || !width || !height) {
    res
      .status(400)
      .send(
        'Image name, width, and height must be provided and valid. Example: /api/resize?image=fjord&width=300&height=500'
      );
    return;
  }

  const imagePath = path.join(FULL_IMAGES_DIR, `${image}.jpg`);

  if (!fs.existsSync(imagePath)) {
    res.status(404).send('Image not found.');
    return;
  }

  next();
};
