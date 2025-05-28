import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';
import logger from '../logging/logger';


const generateAccessToken = (id: string) => {
  const payload = { id };
  return jwt.sign(payload, config.secret, { expiresIn: '24h' });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching user register');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Registration error', errors })
    }
    const { email, password } = req.body;
    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail) {
      res.status(400).json({ message: 'Email is already registred' });
    }
    const passwordHashed = bcrypt.hashSync(password, 7);
    const user = new User({ email, password: passwordHashed });
    user.save();
    res.json({ message: 'Registration complete!' })
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching user login');
    const { email, password } = req.body;
    const userWithSameEmail = await User.findOne({ email });
    if (!userWithSameEmail) {
      res.status(400).json({ message: 'Wrong credentials' });
      return;
    }
    const isPasswordValid = bcrypt.compareSync(password, userWithSameEmail.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Wrong credentials' });
    }
    const token = generateAccessToken(userWithSameEmail._id + '');
    res.json({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
