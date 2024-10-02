import express, { Response } from 'express';
import { checkQueryParams } from '../middleware/checkQueryParams';

import { resizeAndSaveImage } from '../middleware/resizeAndSaveImage';
const routes = express.Router();

routes.get('/', (_, res: Response) => {
  res.send(
    'Try /api/resize route with image name, width and height, example: /api/resize?image=fjord&width=300&height=500'
  );
});

routes.get('/resize', checkQueryParams, resizeAndSaveImage);

export default routes;
