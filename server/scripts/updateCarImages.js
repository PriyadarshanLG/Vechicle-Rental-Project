const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

// Mapping of car names to their image paths (no spaces in filenames)
const carImageMap = {
  // Standard Cars
  'Maruti Swift': '/swift.webp',
  'Hyundai i20': '/hyundai-i20-1.webp',
  'Honda City': '/honda-city.webp',
  'Toyota Innova': '/toyota-innova-crysta-exterior-7.webp',
  
  // Luxury Cars
  'BMW 3 Series': '/bmw-3-series-320d-2018-fd-hero-front.webp',
  'Mercedes-Benz C-Class': '/mercedes-benz-c-class.webp',
  'Audi A4': '/audi-a4.webp',
  'Jaguar XE': '/Jaguar-XE-2016MY-39.webp',
  
  // Ultra Luxury Cars
  'BMW 7 Series': '/bmw-7-series.webp',
  'Mercedes-Benz S-Class': '/Mercedes-Benz-S-Class-2021-front-1.webp',
  'Audi A8': '/audi-a8.webp',
  'Rolls-Royce Ghost': '/rolls-royce-ghost.webp',
  
  // Sports Cars
  'Porsche 911': '/porsche-991-.webp',
  'Lamborghini Huracán': '/lamborghini-huracan-v10.webp',
  'Ferrari 488': '/ferrari-488.webp',
  'Audi R8': '/audi-r8.webp'
};

// Connect to MongoDB and update car images
const updateCarImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle-rental');
    console.log('Connected to MongoDB');

    // Get all cars from the database
    const cars = await Vehicle.find({ vehicleType: 'car' });
    console.log(`Found ${cars.length} cars in the database`);

    let updatedCount = 0;
    let notFoundCount = 0;

    // Update each car's image
    for (const car of cars) {
      const imagePath = carImageMap[car.vehicleName];
      
      if (imagePath) {
        await Vehicle.findByIdAndUpdate(
          car._id,
          { image: imagePath },
          { new: true }
        );
        console.log(`✓ Updated ${car.vehicleName} with image: ${imagePath}`);
        updatedCount++;
      } else {
        console.log(`⚠ No image mapping found for: ${car.vehicleName}`);
        notFoundCount++;
      }
    }

    console.log('\n=== Update Summary ===');
    console.log(`Total cars found: ${cars.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Not found in mapping: ${notFoundCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating car images:', error);
    process.exit(1);
  }
};

updateCarImages();

