import { NextFunction, Request, Response } from 'express';
import { getQueryParams } from '../helpers/getQueryParams';

export const checkQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, width, height } = getQueryParams(req);

  if (!image || !width || !height) {
    res
      .status(400)
      .send(
        'Image name, width, and height must be provided and valid. Example: /api/resize?image=fjord&width=300&height=500'
      );
  }

  next();
};
