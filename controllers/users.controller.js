const { User } = require('../models/users.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ status: 'error' });
    }
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const createUser = async (req, res) => {
  try {
    const { ...columns } = req.body;
    const user = await User.create({ ...columns });
    if (!user) {
      return res.status(404).json({ status: 'error' });
    }
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Not user found given that ID' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...columns } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Not user found given that ID' });
    }
    user.update({ ...columns });
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Not user found given that ID' });
    }
    user.update({ status: 'deleted' });
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
