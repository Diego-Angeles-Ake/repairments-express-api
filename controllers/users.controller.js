const { catchAsync } = require('../helpers/catchAsync');
const { Repair } = require('../models/repairs.model');
const { User } = require('../models/users.model');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ include: [{ model: Repair }] });
  if (!users) {
    return next(new AppError('No users found', 404));
  }
  res.status(200).json({ users });
});

const createUser = catchAsync(async (req, res, next) => {
  const { ...columns } = req.body;
  const user = await User.create({ ...columns });
  return res.status(201).json({ user });
});

const getUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({ user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { ...columns } = req.body;
  const { user } = req;
  user.update({ ...columns });
  return res.status(200).json({ status: 'success' });
});

const removeUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  user.update({ status: 'deleted' });
  return res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
