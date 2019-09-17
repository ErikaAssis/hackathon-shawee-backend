const axios = require('axios');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { first_name, last_name, email, password_hash, area } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(200).json({ message: 'E-mail já cadastrado' });
    }

    await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      area
    });

    return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
  },

  async users(req, res) {
    const users = await User.find({});

    if (users.length > 0) {
      return res.json({ users: users, length: users.length });
    }
    return res.status(404).json({
      error: 'Não existem usuários cadastrados na aplicação'
    });
  }
};
