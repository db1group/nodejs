require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const routes = require('./routes');

server = express();

server.use(express.json());
server.use(routes);

module.exports = server;
