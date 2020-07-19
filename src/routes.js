const routes = require('express').Router();
const GreetingsController = require('./app/controllers/GreetingsController');

routes.get('/hello/:somebody', GreetingsController.greet);
routes.get('/healthcheck', (req, res) => res.status(204).send());

module.exports = routes;
