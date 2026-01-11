const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);

// Admin only routes
router.post('/', authenticate, isAdmin, vehicleController.createVehicle);
router.put('/:id', authenticate, isAdmin, vehicleController.updateVehicle);
router.delete('/:id', authenticate, isAdmin, vehicleController.deleteVehicle);

module.exports = router;

