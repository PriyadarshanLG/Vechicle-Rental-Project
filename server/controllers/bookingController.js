const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// Calculate total amount based on dates and rent per day
const calculateTotalAmount = (fromDate, toDate, rentPerDay) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
  return days * rentPerDay;
};

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, fromDate, toDate } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!vehicleId || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide vehicle ID, start date, and end date'
      });
    }

    // Check if vehicle exists and is available
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    if (!vehicle.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is not available for booking'
      });
    }

    // Validate dates
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (to <= from) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Check for overlapping bookings
    // For hour-based rentals (same day or very short duration), we allow more flexibility
    const daysDiff = Math.ceil((to - from) / (1000 * 60 * 60 * 24));
    const isShortRental = daysDiff <= 1; // Hour-based or same-day rentals
    
    const overlappingBooking = await Booking.findOne({
      vehicleId,
      bookingStatus: { $in: ['pending', 'approved'] },
      $or: [
        {
          fromDate: { $lte: to },
          toDate: { $gte: from }
        }
      ]
    });

    if (overlappingBooking) {
      const overlapFrom = new Date(overlappingBooking.fromDate);
      const overlapTo = new Date(overlappingBooking.toDate);
      const overlapDays = Math.ceil((overlapTo - overlapFrom) / (1000 * 60 * 60 * 24));
      const existingIsShortRental = overlapDays <= 1;
      
      // Allow booking if:
      // 1. Both rentals are short (1 day or less) - multiple hour rentals can coexist
      // 2. New rental is long but existing is very short (hour rental) - long rental can override/coexist
      if (isShortRental && existingIsShortRental) {
        // Both are short rentals - allow multiple hour-based rentals
        // Continue to create the booking
      } else if (!isShortRental && existingIsShortRental) {
        // New rental is long-term, existing is short (hour rental)
        // Allow the long-term rental - it can coexist with or override short rentals
        // Continue to create the booking
      } else {
        // Both are longer rentals or new is short but existing is long - block conflict
        return res.status(400).json({
          success: false,
          message: 'Vehicle is already booked for the selected dates'
        });
      }
    }

    // Calculate total amount - use provided amount if available (for hour-based rentals), otherwise calculate
    const totalAmount = req.body.totalAmount || calculateTotalAmount(fromDate, toDate, vehicle.rentPerDay);

    // Create booking
    const booking = new Booking({
      userId,
      vehicleId,
      fromDate: from,
      toDate: to,
      totalAmount,
      paymentStatus: 'pending',
      bookingStatus: 'pending'
    });

    await booking.save();

    // Populate vehicle details
    await booking.populate('vehicleId');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get bookings for a specific user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    // Check if user is accessing their own bookings or is admin
    // Convert both to strings for comparison to avoid type mismatch
    const requestedUserId = userId.toString();
    const currentUserId = req.user._id.toString();
    
    if (req.user.role !== 'admin' && requestedUserId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const bookings = await Booking.find({ userId: requestedUserId })
      .populate('vehicleId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: { bookings }
    });
  } catch (error) {
    console.error('Error in getUserBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('vehicleId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: { bookings }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Update booking status (Admin only)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const bookingId = req.params.id;

    const updateData = {};
    if (bookingStatus) updateData.bookingStatus = bookingStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true, runValidators: true }
    ).populate('vehicleId').populate('userId', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
};

// Cancel booking (User can cancel their own bookings)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow cancellation if booking is pending or approved
    if (!['pending', 'approved'].includes(booking.bookingStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel booking with current status'
      });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { booking }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};

