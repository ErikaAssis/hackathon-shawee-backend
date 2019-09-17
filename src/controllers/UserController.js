const axios = require('axios');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { first_name, last_name, email, password_hash, area } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.json({ message: 'E-mail já cadastrado' });
    }

    const resp = await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      area
    });

    return res.json({ message: 'Usuário cadastrado com sucesso' });
  },

  async users(req, res) {
    const users = await User.find({});

    if (users.length > 0) {
      return res.json({ users: users });
    }
    return res.json({
      message: 'Não existem usuários cadastrados na aplicação'
    });
  }
};
