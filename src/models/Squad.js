const { Schema, model } = require('mongoose');
const User = require('../models/User');

const SquadSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Squad', SquadSchema);
