const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const GreetingsController = require('./app/controllers/GreetingsController');
const authMiddleware = require('./app/middleware/auth');

routes.post('/sessions', (req, res, next) => {
  SessionController.store(req, res, next);
});

routes.get('/hello', (req, res) => {
  GreetingsController.greet(req, res);
});

routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => res.status(200).send());

module.exports = routes;
