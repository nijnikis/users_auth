import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Email should not be empty').notEmpty(),
    check('password', 'Password should contain minimum 4, but maximum 10 symbols').isLength({ min: 4, max: 10 }),
  ],
  register
  // #swagger.description = 'Create new user'
  /* #swagger.parameters['user'] = {
    in: 'body',
    description: 'New user',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/User' }
  } */
);
router.post(
  '/login',
  login
  // #swagger.description = 'Remove existing todo'
  /* #swagger.parameters['user'] = {
    in: 'body',
    description: 'Login user',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/User' }
  } */
  /* #swagger.responses[201] = {
    description: 'Return token',
    type: 'string',
  } */
);

export default router;
