const Vehicle = require('../models/Vehicle');

// Get all vehicles with optional filters
exports.getAllVehicles = async (req, res) => {
  try {
    const { vehicleType, category, minPrice, maxPrice, isAvailable } = req.query;
    
    // Build filter object
    const filter = {};
    if (vehicleType) filter.vehicleType = vehicleType;
    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (minPrice || maxPrice) {
      filter.rentPerDay = {};
      if (minPrice) filter.rentPerDay.$gte = Number(minPrice);
      if (maxPrice) filter.rentPerDay.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: vehicles.length,
      data: { vehicles }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicles',
      error: error.message
    });
  }
};

// Get single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: { vehicle }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle',
      error: error.message
    });
  }
};

// Create new vehicle (Admin only)
exports.createVehicle = async (req, res) => {
  try {
    const { vehicleName, vehicleType, category, brand, rentPerDay, image, isAvailable } = req.body;

    // Validate required fields
    if (!vehicleName || !vehicleType || !brand || !rentPerDay) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const vehicle = new Vehicle({
      vehicleName,
      vehicleType,
      category: category || 'standard',
      brand,
      rentPerDay,
      image: image || 'https://via.placeholder.com/400x300?text=Vehicle+Image',
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    await vehicle.save();

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: { vehicle }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating vehicle',
      error: error.message
    });
  }
};

// Update vehicle (Admin only)
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: { vehicle }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating vehicle',
      error: error.message
    });
  }
};

// Delete vehicle (Admin only)
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting vehicle',
      error: error.message
    });
  }
};

