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
        message: 'Insufficient number of participants to create a squad.',
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

    return res.status(200).json({
      message: 'Squads successfully created.',
      users_out: users.length
    });
  },

  async delete(req, res) {
    const squad_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(squad_id))
      return res.status(400).json({
        error: 'Id is not valid.'
      });

    const squad = await Squad.findById(squad_id);
    if (!squad)
      return res.status(404).json({
        error: 'Squad do not exits.'
      });

    for (const user of squad.members) {
      await User.findByIdAndUpdate(user, { squad: null });
    }

    await Squad.deleteOne({ _id: squad.id });

    return res.status(200).json({ message: 'Squad successfully removed.' });
  },

  async squad(req, res) {
    const squad_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(squad_id))
      return res.status(400).json({
        error: 'Id is not valid.'
      });

    const squad = await Squad.findById(squad_id);
    if (!squad)
      return res.status(404).json({
        error: 'Squad do not exits.'
      });

    const { id, members } = squad;
    return res.status(200).json({ squad: { id, members } });
  },

  async squads(req, res) {
    const squads_danger = await Squad.find({});
    const squads = [];

    if (squads_danger.length > 0) {
      for (const squad of squads_danger) {
        const { id, members } = squad;
        squads.push({ id, members });
      }
      return res.json({ squads: squads, length: squads.length });
    }
    return res.status(404).json({
      error: 'Squads do not exist in the application.'
    });
  }
};
