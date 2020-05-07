const request = require('supertest');
const factory = require('../factories');

const app = require('../../src/app');

const truncate = require('../utils/truncate');

const userPassword = '123456';
const invalidPassword = '123455';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: userPassword,
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: userPassword,
      });
    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: invalidPassword,
      });
    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: userPassword,
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: userPassword,
      });
    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', { password: userPassword });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt', async () => {
    const response = await request(app)
      .get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid token', async () => {
    const invalidToken = '123456';

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
  });
});
