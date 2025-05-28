import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import logger from '../logging/logger';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Fetching users');
    const users = await User.find();
    const usersList = users.map(user => ({ id: user._id, email: user.email }));
    res.json(usersList);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
