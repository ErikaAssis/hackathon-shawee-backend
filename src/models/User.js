const { Schema, model } = require('mongoose');
const Squad = require('../models/Squad');

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password_hash: {
      type: String,
      required: true
    },
    area: {
      type: String,
      default: null
    },
    squad: {
      type: Schema.Types.ObjectId,
      ref: 'Squad',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', UserSchema);
