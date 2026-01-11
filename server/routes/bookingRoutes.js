const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Protected routes
router.post('/', authenticate, bookingController.createBooking);
router.get('/user/:userId', authenticate, bookingController.getUserBookings);
router.get('/my-bookings', authenticate, bookingController.getUserBookings);
router.put('/:id/cancel', authenticate, bookingController.cancelBooking);

// Admin only routes
router.get('/', authenticate, isAdmin, bookingController.getAllBookings);
router.put('/:id/status', authenticate, isAdmin, bookingController.updateBookingStatus);

module.exports = router;

