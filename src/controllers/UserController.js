const axios = require('axios');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  async store(req, res) {
    const { first_name, last_name, email, password_hash, area } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(200).json({ message: 'E-mail already exists.' });
    }

    await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      area
    });

    return res.status(200).json({ message: 'Successfully registered user.' });
  },

  async users(req, res) {
    const users_danger = await User.find({});
    const users = [];

    if (users_danger.length > 0) {
      for (const user of users_danger) {
        const { id, area, email, first_name, last_name, squad } = user;
        users.push({
          area,
          id,
          email,
          first_name,
          last_name,
          squad
        });
      }
      return res.json({ users: users, length: users.length });
    }
    return res.status(404).json({
      error: 'Users do not exist in the application.'
    });
  },

  async user(req, res) {
    const user_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(user_id))
      return res.status(400).json({
        error: 'Id is not valid.'
      });

    const user = await User.findById(user_id);
    if (!user)
      return res.status(404).json({
        error: 'User do not exits.'
      });

    const { id, area, email, first_name, last_name, squad } = user;
    return res
      .status(200)
      .json({ user: { area, id, email, first_name, last_name, squad } });
  },

  async update(req, res) {
    const user_id = req.params.id;
    const keys = Object.keys(req.body);

    if (!mongoose.Types.ObjectId.isValid(user_id))
      return res.status(400).json({
        error: 'Id is not valid.'
      });

    if (keys.length < 1)
      return res.status(400).json({
        error: 'Request format is wrong.'
      });

    if (
      keys.includes('_id') ||
      keys.includes('email') ||
      keys.includes('password_hash') ||
      keys.includes('squad') ||
      keys.includes('createdAt') ||
      keys.includes('updatedAt') ||
      keys.includes('__v')
    ) {
      return res.status(400).json({
        error: 'Request contains fields that cannot be changed.'
      });
    }

    const user = await User.findByIdAndUpdate(user_id, req.body, {
      new: true
    });

    if (!user)
      return res.status(404).json({
        error: 'User do not exits.'
      });

    const { id, area, email, first_name, last_name, squad } = user;
    return res
      .status(200)
      .json({ user: { area, id, email, first_name, last_name, squad } });
  }
};
