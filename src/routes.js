const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const SquadController = require('./controllers/SquadController');

const routes = express.Router();

routes.post('/user', UserController.store); // Salva um novo usuário
routes.get('/user', UserController.user); // Retorna o usuário de acordo com o id recebido no corpo da requisição
routes.get('/users', UserController.users); // Retorna todos usuários cadastrados
routes.post('/login', SessionController.login); // Realiza login
routes.get('/create_squad', SquadController.create); // Cria squads
routes.get('/squads', SquadController.squads); // Retorna todos squads cadastrados
routes.get('/squad', SquadController.squad); // Retorna o squad de acordo com o id recebido no corpo da requisição
routes.delete('/delete_squad', SquadController.delete); // Apaga o squad de acordo com o id recebido no corpo da requisição

module.exports = routes;
