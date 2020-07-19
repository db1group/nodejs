const request = require('supertest');

const app = require('../../src/app');

describe('Authentication', () => {
  it('should greet somebody', async () => {
    const response = await request(app)
      .get(`/hello/Chico`)
      .send();

    expect(response.body.message).toBe('Hello, Chico!');
    expect(response.ok).toBe(true);
  });

  it('should ask how somebody is when looking sad', async () => {
    const response = await request(app)
      .get(`/hello/Ivo?looking=sad`)
      .send();

    expect(response.body.message).toBe('Hello, Ivo! Is everything alright?');
    expect(response.ok).toBe(true);
  });
});
