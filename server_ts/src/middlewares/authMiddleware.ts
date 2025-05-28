import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'Unauthorised' })
    }
    // const tokenDecoded = jwt.verify('777', config.secret);
    // req.user = tokenDecoded;
    jwt.verify(token!, config.secret);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Unauthorised' });
  }
};
