const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name can not be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isStrongPassword({ minSymbols: 0 })
    .withMessage(
      'Must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number'
    ),
];

const createRepairValidations = [
  body('date').notEmpty().withMessage('Date can not be empty'),
  body('computerNumber')
    .notEmpty()
    .withMessage('Number can not be empty')
    .isNumeric()
    .withMessage('Must be a valid number'),
  body('comments')
    .notEmpty()
    .withMessage('Comments can not be empty')
    .isLength({ max: 280 })
    .withMessage('Comments must be at most 280 characters long'),
  body('userId').isUUID(4).withMessage('Must be V4 UUID'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('.');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }
  next();
};

module.exports = {
  createUserValidations,
  createRepairValidations,
  checkValidations,
};
