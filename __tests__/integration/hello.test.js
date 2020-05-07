const request = require('supertest');
const faker = require('faker');

const app = require('../../src/app');

describe('Authentication', () => {
  it('should greet somebody', async () => {
    const somebody = faker.name.findName();
    const expectedName = `Hello, ${somebody}`;
    const response = await request(app)
      .get(`/hello?name=${somebody}`)
      .send();
    expect(response.body.message).toBe(expectedName);
    expect(response.ok).toBe(true);
  });
});
