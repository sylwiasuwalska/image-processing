import { NextFunction, Request, Response } from 'express';

export const checkQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.query.image as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  if (!image || !width || !height) {
    res
      .status(400)
      .send(
        'Image name, width, and height must be provided and valid. Example: /api/resize?image=fjord&width=300&height=500'
      );
  }

  next();
};
