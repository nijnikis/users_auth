const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('./models/User');
const { secret } = require('./config');


const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const { email, password } = req.body;
      const userWithSameEmail = await User.findOne({ email });
      if (userWithSameEmail) {
        return res.status(400).json({ message: 'Email is already registred' });
      }
      const passwordHashed = bcrypt.hashSync(password, 7);
      const user = new User({ email, password: passwordHashed })
      user.save();
      return res.json({ message: 'Registration complete!' })
    } catch (error) {
      console.log('register error', error);
      res.status(400).json({ message: 'Register error' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userWithSameEmail = await User.findOne({ email });
      if (!userWithSameEmail) {
        return res.status(400).json({ message: 'Wrong credentials' });
      }
      const isPasswordValid = bcrypt.compareSync(password, userWithSameEmail.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Wrong credentials' });
      }
      const token = generateAccessToken(userWithSameEmail._id);
      return res.json({ token });
    } catch (error) {
      res.status(400).json({ message: 'Login error' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const usersList = users.map(user => ({ id: user._id, email: user.email }));
      res.json(usersList);
    } catch (error) {
      res.status(400).json({ message: 'Users error' });
    }
  }
};

module.exports = new authController();
