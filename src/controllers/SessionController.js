const axios = require('axios');
const User = require('../models/User');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ message: 'Usuário não encontrado.' });
    }

    if (user.password_hash !== password) {
      return res.json({ message: 'Senha incorreta.' });
    }

    return res.json({ message: 'Login OK' });
  }
}

module.exports = new SessionController();
