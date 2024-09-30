import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { checkQueryParams } from '../middleware/checkQueryParams';
import { getQueryParams } from '../helpers/getQueryParams';
const routes = express.Router();

const imagesDir = path.resolve(__dirname, '../../assets/full');

routes.get('/', (req, res) => {
  res.send(
    'Try /api/resize route with image name, width and height, example: /api/resize?image=fjord&width=300&height=500'
  );
});

routes.get('/resize', checkQueryParams, async (req: Request, res: Response) => {
  const { image, width, height } = getQueryParams(req);

  const imagePath = path.join(imagesDir, `${image}.jpg`);

  if (!fs.existsSync(imagePath)) {
    res.status(404).send('Image not found.');
  }

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
});

export default routes;
