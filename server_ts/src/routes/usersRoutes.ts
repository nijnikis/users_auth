import { Router } from 'express';
import { getUsers } from '../controllers/usersController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/users',
  authMiddleware,
  getUsers
  // #swagger.description = 'Get all users'
  /* #swagger.responses[200] = {
    description: 'Array of all users',
    schema: { $ref: '#/definitions/Users' }
  } */
);

export default router;
