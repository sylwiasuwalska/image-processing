import { NextFunction, Request, Response } from 'express';
import { getQueryParams } from '../helpers/getQueryParams';
import path from 'path';
import fs from 'fs';
import { FULL_IMAGES_DIR, RESIZED_IMAGES_DIR } from '../consts';
import sharp from 'sharp';

export const resizeAndSaveImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { image, width, height } = getQueryParams(req);

  const imagePath = path.join(FULL_IMAGES_DIR, `${image}.jpg`);

  try {
    const resizedImageBuffer = await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    const resizedImageName = `${image}-${width}x${height}.jpg`;
    const resizedImagePath = path.join(
      RESIZED_IMAGES_DIR,
      `${resizedImageName}`
    );

    // Ensure the resized directory exists
    if (!fs.existsSync(RESIZED_IMAGES_DIR)) {
      fs.mkdirSync(RESIZED_IMAGES_DIR, { recursive: true });
    }

    // Save the resized image
    fs.writeFileSync(resizedImagePath, resizedImageBuffer);

    res.set('Content-Type', 'image/jpeg');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.error('Error resizing image:', error);
    res.status(500).send('Error resizing image.');
  }

  next();
};
