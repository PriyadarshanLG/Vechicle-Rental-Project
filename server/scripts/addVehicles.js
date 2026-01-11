const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

// Sample vehicles data with categories, images, and INR pricing
const vehicles = [
  // Standard Cars
  {
    vehicleName: 'Maruti Swift',
    vehicleType: 'car',
    category: 'standard',
    brand: 'Maruti Suzuki',
    rentPerDay: 1500,
    image: '/swift.webp',
    isAvailable: true,
    maxSpeed: 165,
    mileage: 23.2,
    seatCapacity: 5,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '1.2L K12B',
    year: 2023,
    color: 'White'
  },
  {
    vehicleName: 'Hyundai i20',
    vehicleType: 'car',
    category: 'standard',
    brand: 'Hyundai',
    rentPerDay: 1800,
    image: '/hyundai-i20-1.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Honda City',
    vehicleType: 'car',
    category: 'standard',
    brand: 'Honda',
    rentPerDay: 2500,
    image: '/honda-city.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Toyota Innova',
    vehicleType: 'car',
    category: 'standard',
    brand: 'Toyota',
    rentPerDay: 3500,
    image: '/toyota-innova-crysta-exterior-7.webp',
    isAvailable: true
  },
  
  // Luxury Cars
  {
    vehicleName: 'BMW 3 Series',
    vehicleType: 'car',
    category: 'luxury',
    brand: 'BMW',
    rentPerDay: 8000,
    image: '/bmw-3-series-320d-2018-fd-hero-front.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Mercedes-Benz C-Class',
    vehicleType: 'car',
    category: 'luxury',
    brand: 'Mercedes-Benz',
    rentPerDay: 8500,
    image: '/mercedes-benz-c-class.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Audi A4',
    vehicleType: 'car',
    category: 'luxury',
    brand: 'Audi',
    rentPerDay: 9000,
    image: '/audi-a4.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Jaguar XE',
    vehicleType: 'car',
    category: 'luxury',
    brand: 'Jaguar',
    rentPerDay: 10000,
    image: '/Jaguar-XE-2016MY-39.webp',
    isAvailable: true
  },
  
  // Ultra Luxury Cars
  {
    vehicleName: 'BMW 7 Series',
    vehicleType: 'car',
    category: 'ultraluxury',
    brand: 'BMW',
    rentPerDay: 25000,
    image: '/bmw-7-series.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Mercedes-Benz S-Class',
    vehicleType: 'car',
    category: 'ultraluxury',
    brand: 'Mercedes-Benz',
    rentPerDay: 28000,
    image: '/Mercedes-Benz-S-Class-2021-front-1.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Audi A8',
    vehicleType: 'car',
    category: 'ultraluxury',
    brand: 'Audi',
    rentPerDay: 30000,
    image: '/audi-a8.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Rolls-Royce Ghost',
    vehicleType: 'car',
    category: 'ultraluxury',
    brand: 'Rolls-Royce',
    rentPerDay: 50000,
    image: '/rolls-royce-ghost.webp',
    isAvailable: true
  },
  
  // Sports Cars
  {
    vehicleName: 'Porsche 911',
    vehicleType: 'car',
    category: 'sports',
    brand: 'Porsche',
    rentPerDay: 35000,
    image: '/porsche-991-.webp',
    isAvailable: true,
    maxSpeed: 308,
    mileage: 10.5,
    seatCapacity: 4,
    fuelType: 'petrol',
    transmission: 'automatic',
    engine: '3.0L Turbo',
    year: 2023,
    color: 'Racing Yellow'
  },
  {
    vehicleName: 'Lamborghini Huracán',
    vehicleType: 'car',
    category: 'sports',
    brand: 'Lamborghini',
    rentPerDay: 60000,
    image: '/lamborghini-huracan-v10.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Ferrari 488',
    vehicleType: 'car',
    category: 'sports',
    brand: 'Ferrari',
    rentPerDay: 70000,
    image: '/ferrari-488.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Audi R8',
    vehicleType: 'car',
    category: 'sports',
    brand: 'Audi',
    rentPerDay: 55000,
    image: '/audi-r8.webp',
    isAvailable: true
  },
  
  // Standard Bikes
  {
    vehicleName: 'Honda Activa',
    vehicleType: 'bike',
    category: 'standard',
    brand: 'Honda',
    rentPerDay: 500,
    image: '/tvs-jupiter.webp', // Using TVS Jupiter image as placeholder (no Honda Activa image available)
    isAvailable: true
  },
  {
    vehicleName: 'TVS Jupiter',
    vehicleType: 'bike',
    category: 'standard',
    brand: 'TVS',
    rentPerDay: 450,
    image: '/tvs-jupiter.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Bajaj Pulsar 150',
    vehicleType: 'bike',
    category: 'standard',
    brand: 'Bajaj',
    rentPerDay: 800,
    image: '/BajajPulsar150TwinDiscABSBS6-7.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Yamaha FZ',
    vehicleType: 'bike',
    category: 'standard',
    brand: 'Yamaha',
    rentPerDay: 1000,
    image: '/fz-s-right-front-three-quarter-3.webp',
    isAvailable: true
  },
  
  // Luxury Bikes
  {
    vehicleName: 'Royal Enfield Classic 350',
    vehicleType: 'bike',
    category: 'luxury',
    brand: 'Royal Enfield',
    rentPerDay: 2000,
    image: '/royal-enfield-350.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Harley-Davidson Street 750',
    vehicleType: 'bike',
    category: 'luxury',
    brand: 'Harley-Davidson',
    rentPerDay: 5000,
    image: '/harley-devion.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Triumph Bonneville',
    vehicleType: 'bike',
    category: 'luxury',
    brand: 'Triumph',
    rentPerDay: 6000,
    image: '/triumph-bonneville.webp',
    isAvailable: true
  },
  
  // Sports Bikes
  {
    vehicleName: 'Yamaha R15',
    vehicleType: 'bike',
    category: 'sports',
    brand: 'Yamaha',
    rentPerDay: 1500,
    image: '/yamaha-r15.webp',
    isAvailable: true,
    maxSpeed: 136,
    mileage: 45,
    seatCapacity: 2,
    fuelType: 'petrol',
    transmission: 'manual',
    engine: '155cc',
    year: 2023,
    color: 'Racing Blue'
  },
  {
    vehicleName: 'Kawasaki Ninja 300',
    vehicleType: 'bike',
    category: 'sports',
    brand: 'Kawasaki',
    rentPerDay: 4000,
    image: '/kawasaki-ninja-300.webp',
    isAvailable: true
  },
  {
    vehicleName: 'Ducati Panigale',
    vehicleType: 'bike',
    category: 'sports',
    brand: 'Ducati',
    rentPerDay: 12000,
    image: '/ducati-panigale-v4.webp',
    isAvailable: true
  },
  {
    vehicleName: 'BMW S1000RR',
    vehicleType: 'bike',
    category: 'sports',
    brand: 'BMW',
    rentPerDay: 15000,
    image: '/bmw-s1000rr.webp',
    isAvailable: true
  }
];

// Connect to MongoDB and add vehicles
const addVehicles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle-rental');
    console.log('Connected to MongoDB');

    // Clear existing vehicles (optional - comment out if you want to keep existing)
    // await Vehicle.deleteMany({});
    // console.log('Cleared existing vehicles');

    // Add new vehicles
    const insertedVehicles = await Vehicle.insertMany(vehicles);
    console.log(`Successfully added ${insertedVehicles.length} vehicles to the database!`);
    
    // Display summary
    const summary = {
      cars: insertedVehicles.filter(v => v.vehicleType === 'car').length,
      bikes: insertedVehicles.filter(v => v.vehicleType === 'bike').length,
      standard: insertedVehicles.filter(v => v.category === 'standard').length,
      luxury: insertedVehicles.filter(v => v.category === 'luxury').length,
      ultraluxury: insertedVehicles.filter(v => v.category === 'ultraluxury').length,
      sports: insertedVehicles.filter(v => v.category === 'sports').length
    };
    
    console.log('\nSummary:');
    console.log(`Cars: ${summary.cars}`);
    console.log(`Bikes: ${summary.bikes}`);
    console.log(`Standard: ${summary.standard}`);
    console.log(`Luxury: ${summary.luxury}`);
    console.log(`Ultra Luxury: ${summary.ultraluxury}`);
    console.log(`Sports: ${summary.sports}`);

    process.exit(0);
  } catch (error) {
    console.error('Error adding vehicles:', error);
    process.exit(1);
  }
};

addVehicles();


