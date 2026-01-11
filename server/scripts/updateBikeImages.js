const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

// Mapping of bike names to their image paths
const bikeImageMap = {
  'TVS Jupiter': '/tvs jupiter.webp',
  'Bajaj Pulsar 150': '/BajajPulsar150TwinDiscABSBS6-7.webp',
  'Yamaha FZ': '/fz-s-right-front-three-quarter-3.webp',
  'Honda Activa': '/tvs jupiter.webp', // Using TVS Jupiter as placeholder
  'Royal Enfield Classic 350': '/royal enfield 350.webp',
  'Harley-Davidson Street 750': '/Harley Devion.webp',
  'Triumph Bonneville': '/triump bonneville.webp',
  'Yamaha R15': '/yamaha r15.webp',
  'Kawasaki Ninja 300': '/kawasaki ninja 300.webp',
  'Ducati Panigale': '/ducati Panigale v4.webp',
  'BMW S1000RR': '/bmw-s1000rr.webp'
};

// Connect to MongoDB and update bike images
const updateBikeImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle-rental');
    console.log('Connected to MongoDB');

    // Get all bikes from the database
    const bikes = await Vehicle.find({ vehicleType: 'bike' });
    console.log(`Found ${bikes.length} bikes in the database`);

    let updatedCount = 0;
    let notFoundCount = 0;

    // Update each bike's image
    for (const bike of bikes) {
      const imagePath = bikeImageMap[bike.vehicleName];
      
      if (imagePath) {
        await Vehicle.findByIdAndUpdate(
          bike._id,
          { image: imagePath },
          { new: true }
        );
        console.log(`✓ Updated ${bike.vehicleName} with image: ${imagePath}`);
        updatedCount++;
      } else {
        console.log(`⚠ No image mapping found for: ${bike.vehicleName}`);
        notFoundCount++;
      }
    }

    console.log('\n=== Update Summary ===');
    console.log(`Total bikes found: ${bikes.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Not found in mapping: ${notFoundCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating bike images:', error);
    process.exit(1);
  }
};

updateBikeImages();

