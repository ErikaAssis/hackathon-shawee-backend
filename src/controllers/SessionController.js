const axios = require('axios');
const User = require('../models/User');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.password_hash !== password) {
      return res.status(404).json({ error: 'Incorrect password.' });
    }

    return res.status(200).json({ message: 'Login OK', id_user: user.id });
  }
}

module.exports = new SessionController();
