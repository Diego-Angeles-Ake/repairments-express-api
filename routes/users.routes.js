const express = require('express');
const router = express.Router();

// Controller
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/users.controller');
// Middleware
const { userExists } = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

router
  .route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, createUser);
router
  .use('/:id', userExists)
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(removeUser);

module.exports = {
  usersRouter: router,
};
