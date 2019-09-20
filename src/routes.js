const express = require('express');
const path = require('path');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const SquadController = require('./controllers/SquadController');
const QuestionController = require('./controllers/QuestionController');

const routes = express.Router();

// Apresenta o help da API
routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

routes.post('/api/users', UserController.store);
routes.get('/api/users/:id', UserController.user);
routes.put('/api/users/:id', UserController.update);
routes.get('/api/users', UserController.users);

routes.post('/api/login', SessionController.login);

routes.post('/api/squads', SquadController.create);
routes.get('/api/squads', SquadController.squads);
routes.get('/api/squads/:id', SquadController.squad);
routes.delete('/api/squads/:id', SquadController.delete);

routes.post('/api/questions', QuestionController.store);
routes.get('/api/questions/:area', QuestionController.questions_area);
routes.get('/api/questions', QuestionController.questions);

module.exports = routes;
