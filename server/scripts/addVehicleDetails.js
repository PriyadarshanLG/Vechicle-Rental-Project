const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

// Vehicle details mapping with specifications
const vehicleDetails = {
  // Standard Cars
  'Maruti Swift': {
    maxSpeed: 165,
    mileage: 23.2,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '1.2L K12B',
    year: 2023,
    color: 'White'
  },
  'Hyundai i20': {
    maxSpeed: 170,
    mileage: 20.35,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '1.2L Kappa',
    year: 2023,
    color: 'Phantom Black'
  },
  'Honda City': {
    maxSpeed: 180,
    mileage: 17.8,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'cvt',
    engine: '1.5L i-VTEC',
    year: 2023,
    color: 'Platinum White'
  },
  'Toyota Innova': {
    maxSpeed: 160,
    mileage: 15.1,
    seatCapacity: 7,
    fuelType: 'diesel',
    transmission: 'manual',
    engine: '2.4L GD',
    year: 2023,
    color: 'Super White'
  },
  
  // Luxury Cars
  'BMW 3 Series': {
    maxSpeed: 250,
    mileage: 15.2,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '2.0L Turbo',
    year: 2023,
    color: 'Mineral White'
  },
  'Mercedes-Benz C-Class': {
    maxSpeed: 250,
    mileage: 14.5,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '1.5L Turbo',
    year: 2023,
    color: 'Selenite Grey'
  },
  'Audi A4': {
    maxSpeed: 250,
    mileage: 17.2,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '2.0L TFSI',
    year: 2023,
    color: 'Ibis White'
  },
  'Jaguar XE': {
    maxSpeed: 250,
    mileage: 16.5,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '2.0L Ingenium',
    year: 2023,
    color: 'Firenze Red'
  },
  
  // Ultra Luxury Cars
  'BMW 7 Series': {
    maxSpeed: 250,
    mileage: 12.5,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.0L Turbo',
    year: 2023,
    color: 'Mineral White'
  },
  'Mercedes-Benz S-Class': {
    maxSpeed: 250,
    mileage: 11.8,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.0L Turbo',
    year: 2023,
    color: 'Obsidian Black'
  },
  'Audi A8': {
    maxSpeed: 250,
    mileage: 12.2,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.0L TFSI',
    year: 2023,
    color: 'Florett Silver'
  },
  'Rolls-Royce Ghost': {
    maxSpeed: 250,
    mileage: 9.8,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '6.75L V12',
    year: 2023,
    color: 'Diamond Black'
  },
  
  // Sports Cars
  'Porsche 911': {
    maxSpeed: 308,
    mileage: 10.5,
    seatCapacity: 4,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.0L Turbo',
    year: 2023,
    color: 'Racing Yellow'
  },
  'Lamborghini Huracán': {
    maxSpeed: 325,
    mileage: 8.5,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '5.2L V10',
    year: 2023,
    color: 'Arancio Xanto'
  },
  'Ferrari 488': {
    maxSpeed: 330,
    mileage: 8.2,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.9L V8 Turbo',
    year: 2023,
    color: 'Rosso Corsa'
  },
  'Audi R8': {
    maxSpeed: 320,
    mileage: 9.2,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '5.2L V10',
    year: 2023,
    color: 'Daytona Grey'
  },
  
  // Standard Bikes
  'Honda Activa': {
    maxSpeed: 85,
    mileage: 60,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'cvt',
    engine: '109.51cc',
    year: 2023,
    color: 'Pearl Siren Blue'
  },
  'TVS Jupiter': {
    maxSpeed: 80,
    mileage: 62,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'cvt',
    engine: '109.7cc',
    year: 2023,
    color: 'Candy Red'
  },
  'Bajaj Pulsar 150': {
    maxSpeed: 110,
    mileage: 55,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '149.5cc',
    year: 2023,
    color: 'Ebony Black'
  },
  'Yamaha FZ': {
    maxSpeed: 115,
    mileage: 50,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '149cc',
    year: 2023,
    color: 'Metallic Grey'
  },
  
  // Luxury Bikes
  'Royal Enfield Classic 350': {
    maxSpeed: 120,
    mileage: 35,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '349cc',
    year: 2023,
    color: 'Gunmetal Grey'
  },
  'Harley-Davidson Street 750': {
    maxSpeed: 140,
    mileage: 20,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '749cc',
    year: 2023,
    color: 'Vivid Black'
  },
  'Triumph Bonneville': {
    maxSpeed: 145,
    mileage: 22,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '900cc',
    year: 2023,
    color: 'Cranberry Red'
  },
  
  // Sports Bikes
  'Yamaha R15': {
    maxSpeed: 136,
    mileage: 45,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '155cc',
    year: 2023,
    color: 'Racing Blue'
  },
  'Kawasaki Ninja 300': {
    maxSpeed: 180,
    mileage: 30,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '296cc',
    year: 2023,
    color: 'Lime Green'
  },
  'Ducati Panigale': {
    maxSpeed: 299,
    mileage: 15,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '1103cc V4',
    year: 2023,
    color: 'Ducati Red'
  },
  'BMW S1000RR': {
    maxSpeed: 303,
    mileage: 18,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '999cc',
    year: 2023,
    color: 'Racing Red'
  }
};

// Connect to MongoDB and update vehicle details
const addVehicleDetails = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle-rental');
    console.log('Connected to MongoDB');

    const vehicles = await Vehicle.find({});
    console.log(`Found ${vehicles.length} vehicles in the database`);

    let updatedCount = 0;
    let notFoundCount = 0;

    for (const vehicle of vehicles) {
      const details = vehicleDetails[vehicle.vehicleName];
      
      if (details) {
        await Vehicle.findByIdAndUpdate(
          vehicle._id,
          { $set: details },
          { new: true }
        );
        console.log(`✓ Updated ${vehicle.vehicleName} with specifications`);
        updatedCount++;
      } else {
        console.log(`⚠ No details found for: ${vehicle.vehicleName}`);
        notFoundCount++;
      }
    }

    console.log('\n=== Update Summary ===');
    console.log(`Total vehicles found: ${vehicles.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Not found in mapping: ${notFoundCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating vehicle details:', error);
    process.exit(1);
  }
};

addVehicleDetails();


