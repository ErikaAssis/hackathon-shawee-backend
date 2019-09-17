const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/user', UserController.store);
routes.get('/users', UserController.users);
routes.post('/login', SessionController.login);

module.exports = routes;
