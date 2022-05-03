const { AppError } = require('../helpers/AppError');
const { catchAsync } = require('../helpers/catchAsync');
const { Repair } = require('../models/repairs.model');
const { User } = require('../models/users.model');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    include: [{ model: Repair }],
  });
  if (!user) {
    return next(new AppError('User does not exist with given Id', 404));
  }
  // Appending user data to req object
  req.user = user;
  next();
});

module.exports = { userExists };
