import request from 'supertest';
import express from 'express';
import { checkQueryParams } from '../middleware/checkQueryParams';
import fs from 'fs';

const app = express();
app.get('/resize', checkQueryParams);

describe('checkQueryParams', () => {
  it('should return 400 if image, width, or height is not provided', async () => {
    const response = await request(app).get('/resize?image=fjord&width=300');
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'Image name, width, and height must be provided and valid. Example: /api/resize?image=fjord&width=300&height=500'
    );
  });

  it('should return 404 if image is not found', async () => {
    spyOn(fs, 'existsSync').and.returnValue(false);

    const response = await request(app).get(
      '/resize?image=fjord&width=300&height=500'
    );
    expect(response.status).toBe(404);
    expect(response.text).toBe('Image not found.');
  });
});
