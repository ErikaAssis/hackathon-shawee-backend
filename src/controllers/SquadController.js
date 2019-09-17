const axios = require('axios');
const User = require('../models/User');
const Squad = require('../models/Squad');
const mongoose = require('mongoose');
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

  async delete(req, res) {
    const { squad_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(squad_id))
      return res.status(400).json({
        error: 'Id não é válido.'
      });

    const squad = await Squad.findById(squad_id);
    if (!squad)
      return res.status(404).json({
        error: 'Squad não existe.'
      });

    for (const user of squad.members) {
      await User.findByIdAndUpdate(user, { squad: null });
    }

    await Squad.deleteOne({ _id: squad.id });

    return res.status(200).json({ message: 'Squad removido com sucesso.' });
  },

  async squad(req, res) {
    const { squad_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(squad_id))
      res.status(400).json({
        error: 'Id não é válido.'
      });

    const squad = await Squad.findById(squad_id);
    if (!squad)
      res.status(404).json({
        error: 'Squad não existe.'
      });

    return res.status(200).json({ squad: squad });
  },

  async squads(req, res) {
    const squads = await Squad.find({});

    if (squads.length > 0) {
      return res.json({ squads: squads, length: squads.length });
    }
    return res.status(404).json({
      error: 'Não existem squads cadastrados na aplicação'
    });
  }
};
