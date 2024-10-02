import app from '../index'
import supertest from 'supertest'

const request = supertest(app)

describe('main endpoint test', () => {
  it('gets the main endpoint with 200 status and text', async () => {
    const response = await request.get('/api')

    expect(response.status).toBe(200)
    expect(response.text).toBe(
      'Try /api/resize route with image name, width and height, example: /api/resize?image=fjord&width=300&height=500',
    )
  })
})
