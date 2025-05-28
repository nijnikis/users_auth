const Router = require('express');
const { check } = require('express-validator');
const controller = require('./authController');
const authMiddleware = require('./middleware/authMiddleware');

const router = new Router();

router.post(
  '/register',
  [
    check('email', 'Email should not be empty').notEmpty(),
    check('password', 'Password should contain minimum 4, but maximum 10 symbols').isLength({ min: 4, max: 10 }),
  ],
  controller.register
);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
