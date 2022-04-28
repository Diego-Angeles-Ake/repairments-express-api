const { Repair } = require('../models/repairs.model');
const { Op } = require('sequelize');

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });
    if (!repairs) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No repairs found' });
    }
    return res.status(200).json({ repairs });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const createRepair = async (req, res) => {
  try {
    const { ...columns } = req.body;
    const repair = await Repair.create({ ...columns });
    if (!repair) {
      return res(404).json({ status: 'error' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ status: 'error', message: `${err.message}` });
  }
};

const getRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: { id, status: { [Op.like]: 'pending' } },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No pending repair found given that ID',
      });
    }
    return res.status(200).json({ repair });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...columns } = req.body;
    if (columns['status'] !== 'completed' && columns['status'] !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'Only allowed to update status to completed or pending',
      });
    }
    const repair = await Repair.findOne({
      // ? Changed one-way update in case of a mistake
      where: { id /* , status: { [Op.like]: 'pending' } */ },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No pending repair found given that ID',
      });
    }
    repair.update({ ...columns });
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

const removeRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: { id, status: { [Op.like]: 'pending' } },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'No pending repair found given that ID',
      });
    }
    repair.update({ status: 'cancelled' });
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', message: `${err.message}` });
  }
};

module.exports = {
  getAllRepairs,
  createRepair,
  getRepair,
  updateRepair,
  removeRepair,
};
