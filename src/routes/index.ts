import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
const routes = express.Router();

const imagesDir = path.resolve(__dirname, '../../assets/full');

routes.get('/', (req, res) => {
  res.send('This is main route');
});

routes.get('/resize', async (req: Request, res: Response) => {
  const image = req.query.image as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (!image || !width || !height) {
    res
      .status(400)
      .send('Image name, width, and height must be provided and valid.');
  }

  const imagePath = path.join(imagesDir, `${image}.jpg`);

  if (!fs.existsSync(imagePath)) {
    res.status(404).send('Image not found');
  }

  try {
    const resizedImageBuffer = await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    res.set('Content-Type', 'image/jpeg');
    res.send(resizedImageBuffer);
  } catch (error) {
    console.error('Error resizing image:', error);
    res.status(500).send('Error resizing image');
  }
});

export default routes;
