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

router.route('/').get(getAllRepairs).post(createRepair);
router.route('/:id').get(getRepair).patch(updateRepair).delete(removeRepair);

module.exports = {
  repairsRouter: router,
};
