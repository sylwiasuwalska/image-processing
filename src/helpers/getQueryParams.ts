import { Request } from 'express';

export const getQueryParams = (
  req: Request
): { image: string; width: string; height: string } => {
  const image = req.query.image as string;
  const width = req.query.width as string;
  const height = req.query.height as string;

  return { image, width, height };
};
