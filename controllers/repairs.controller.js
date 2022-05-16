const { catchAsync } = require('../helpers/catchAsync');
const { Repair } = require('../models/repairs.model');
const { User } = require('../models/users.model');
// Error handler

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });
  if (!repairs) {
    return next(new AppError('No repairs found', 404));
  }
  return res.status(200).json({ repairs });
});

const createRepair = catchAsync(async (req, res, next) => {
  const { ...columns } = req.body;
  const repair = await Repair.create({ ...columns });
  return res.status(201).json({ repair });
});

const getRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  return res.status(200).json({ repair });
});

const updateRepair = catchAsync(async (req, res, next) => {
  const { ...columns } = req.body;
  // Allow employee to change status back to pending in case of a mistake
  if (columns['status'] !== 'completed' && columns['status'] !== 'pending') {
    return next(
      new AppError('Only allow to update status to completed or pending', 400)
    );
  }
  const { repair } = req;
  repair.update({ ...columns });
  return res.status(200).json({ status: 'success' });
});

const removeRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  repair.update({ status: 'cancelled' });
  return res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllRepairs,
  createRepair,
  getRepair,
  updateRepair,
  removeRepair,
};
