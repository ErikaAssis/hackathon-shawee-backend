const axios = require('axios');
const User = require('../models/User');
const mongoose = require('mongoose');

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
  },

  async user(req, res) {
    const { user_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id))
      return res.status(400).json({
        error: 'Id não é válido.'
      });

    const user = await User.findById(user_id);
    if (!user)
      return res.status(404).json({
        error: 'Usuário não existe.'
      });

    return res.status(200).json({ user: user });
  }
};
