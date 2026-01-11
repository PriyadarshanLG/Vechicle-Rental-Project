const mongoose = require('mongoose');

// Booking Schema for managing vehicle rentals
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle ID is required']
  },
  fromDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  toDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount must be positive']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validate that toDate is after fromDate
bookingSchema.pre('save', function(next) {
  if (this.toDate <= this.fromDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);

