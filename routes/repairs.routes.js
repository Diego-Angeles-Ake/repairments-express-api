const express = require('express');
const router = express.Router();

// Controller
const {
  getAllRepairs,
  createRepair,
  getRepair,
  updateRepair,
  removeRepair,
} = require('../controllers/repairs.controller');
// Middleware
const { repairExists } = require('../middlewares/repairs.middlwares');
const {
  createUserValidations,
  checkValidations,
  createRepairValidations,
} = require('../middlewares/validations.middlewares');

router
  .route('/')
  .get(getAllRepairs)
  .post(createRepairValidations, checkValidations, createRepair);
router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepair)
  .patch(updateRepair)
  .delete(removeRepair);

module.exports = {
  repairsRouter: router,
};
