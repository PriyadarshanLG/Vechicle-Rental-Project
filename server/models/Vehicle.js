const mongoose = require('mongoose');

// Vehicle Schema for storing vehicle information
const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: [true, 'Vehicle name is required'],
    trim: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike'],
    required: [true, 'Vehicle type is required']
  },
  category: {
    type: String,
    enum: ['standard', 'luxury', 'ultraluxury', 'sports', 'all'],
    default: 'standard',
    required: [true, 'Category is required']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  rentPerDay: {
    type: Number,
    required: [true, 'Rent per day is required'],
    min: [0, 'Rent must be a positive number']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Vehicle+Image'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  // Vehicle specifications
  maxSpeed: {
    type: Number,
    default: null
  },
  mileage: {
    type: Number,
    default: null
  },
  seatCapacity: {
    type: Number,
    default: null
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng'],
    default: null
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic', 'cvt'],
    default: null
  },
  engine: {
    type: String,
    default: null
  },
  year: {
    type: Number,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);

