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

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(removeUser);

module.exports = {
  usersRouter: router,
};
