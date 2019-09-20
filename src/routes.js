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
routes.post('/api/user', UserController.store); // Salva um novo usuário
routes.get('/api/user/:id', UserController.user); // Retorna o usuário de acordo com o id recebido
routes.put('/api/update_user/:id', UserController.update); // Altera o usuário de acordo com o id recebido
routes.get('/api/users', UserController.users); // Retorna todos usuários cadastrados
routes.post('/api/login', SessionController.login); // Realiza login
routes.get('/api/create_squad', SquadController.create); // Cria squads
routes.get('/api/squads', SquadController.squads); // Retorna todos squads cadastrados
routes.get('/api/squad/:id', SquadController.squad); // Retorna o squad de acordo com o id recebido
routes.delete('/api/delete_squad/:id', SquadController.delete); // Apaga o squad de acordo com o id
routes.post('/api/questions', QuestionController.store); // Cria uma nova questão
routes.get('/api/questions/:area', QuestionController.questions_area); // Retorna as questões de acordo com a area
routes.get('/api/questions', QuestionController.questions); // Retorna as questões de acordo com a area

module.exports = routes;
