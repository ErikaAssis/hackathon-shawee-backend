const axios = require('axios');
const User = require('../models/User');
const Squad = require('../models/Squad');
const lengthSquad = 4;

module.exports = {
  async create(req, res) {
    const users = await User.find({ squad: null });

    if (users.length < lengthSquad)
      return res.status(200).json({
        message: `Quantidade de participantes insuficiente para a criação de um squad de ${lengthSquad} pessoas.`,
        users_out: users.length
      });

    let count = parseInt(users.length / 4);

    while (count > 0) {
      const squad = await Squad.create({ members: null });
      let users_squad = [];

      for (let index = 0; index < 4; index++) {
        users_squad.push(
          await User.findByIdAndUpdate(users.shift().id, { squad: squad })
        );
      }
      await Squad.findOneAndUpdate({ _id: squad.id }, { members: users_squad });
      count--;
    }

    return res
      .status(200)
      .json({ message: 'Squads criado com sucesso.', users_out: users.length });
  },

  async delete(req, res) {}
};
