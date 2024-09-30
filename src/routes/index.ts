import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { checkQueryParams } from '../middleware/checkQueryParams';
import { getQueryParams } from '../helpers/getQueryParams';
import { resizeAndSaveImage } from '../middleware/resizeAndSaveImage';
const routes = express.Router();

const imagesDir = path.resolve(__dirname, '../../assets/full');

routes.get('/', (req, res) => {
  res.send(
    'Try /api/resize route with image name, width and height, example: /api/resize?image=fjord&width=300&height=500'
  );
});

routes.get('/resize', checkQueryParams, resizeAndSaveImage);

export default routes;
