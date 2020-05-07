const { User } = require('../models');

class SessionController {
  constructor(userModel) {
    this.user = userModel;
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await this.user.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.json({
      user,
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController(User);
