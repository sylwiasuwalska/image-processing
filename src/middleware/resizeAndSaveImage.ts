import { NextFunction, Request, Response } from 'express';
import { getQueryParams } from '../helpers/getQueryParams';
import path from 'path';
import { IMAGES_DIR } from '../consts';
import sharp from 'sharp';

export const resizeAndSaveImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, width, height } = getQueryParams(req);

  const imagePath = path.join(IMAGES_DIR, `${image}.jpg`);

  try {
    const resizedImageBuffer = await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.error('Error resizing image:', error);
    res.status(500).send('Error resizing image.');
  }

  next();
};
