import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

// Vehicle Details page with booking functionality
const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    fromDate: '',
    toDate: '',
    packageType: 'custom', // 'hours', 'days', 'months', 'custom'
    selectedPackage: null
  });

  useEffect(() => {
    // Scroll to top when page opens
    window.scrollTo(0, 0);
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getVehicleById(id);
      setVehicle(response.data.vehicle);
    } catch (error) {
      toast.error('Error fetching vehicle details');
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  // Calculate pricing for different packages with progressive discounts
  const calculatePackagePrice = (packageType, value) => {
    if (!vehicle) return 0;
    
    switch (packageType) {
      case 'hours': {
        // Hourly rate with progressive discounts for longer rentals
        const hours = Math.max(value, 4);
        const baseHourlyRate = vehicle.rentPerDay / 24;
        const basePrice = baseHourlyRate * hours;
        
        // Apply discounts based on hours
        let discount = 0;
        if (hours >= 24) discount = 0.15; // 15% discount for 24 hours
        else if (hours >= 12) discount = 0.10; // 10% discount for 12 hours
        else if (hours >= 8) discount = 0.05; // 5% discount for 8 hours
        
        return Math.ceil(basePrice * (1 - discount));
      }
      
      case 'days': {
        // Daily rate with progressive discounts for longer periods
        const baseDailyRate = vehicle.rentPerDay;
        if (value === 1) return baseDailyRate;
        if (value === 3) return Math.ceil(baseDailyRate * 2.7); // 10% discount (3 days for price of 2.7)
        if (value === 7) return Math.ceil(baseDailyRate * 6.0); // 14.3% discount (7 days for price of 6)
        if (value === 30) return Math.ceil(baseDailyRate * 24); // 20% discount (30 days for price of 24)
        return baseDailyRate * value;
      }
      
      case 'months': {
        // Monthly rate with progressive discounts - better rates for longer commitments
        const baseMonthlyRate = vehicle.rentPerDay * 30;
        if (value === 1) return Math.ceil(baseMonthlyRate * 0.90); // 10% discount
        if (value === 3) return Math.ceil(baseMonthlyRate * 2.55); // 15% discount (3 months for price of 2.55)
        if (value === 6) return Math.ceil(baseMonthlyRate * 4.8); // 20% discount (6 months for price of 4.8)
        if (value === 12) return Math.ceil(baseMonthlyRate * 8.4); // 30% discount (12 months for price of 8.4)
        return baseMonthlyRate * value;
      }
      
      case 'custom': {
        if (!bookingData.fromDate || !bookingData.toDate) return 0;
        const from = new Date(bookingData.fromDate);
        const to = new Date(bookingData.toDate);
        const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        
        // Apply progressive discounts for custom date ranges
        let discount = 0;
        if (days >= 30) discount = 0.20; // 20% discount for 30+ days
        else if (days >= 14) discount = 0.15; // 15% discount for 14+ days
        else if (days >= 7) discount = 0.10; // 10% discount for 7+ days
        else if (days >= 3) discount = 0.05; // 5% discount for 3+ days
        
        const basePrice = days * vehicle.rentPerDay;
        return Math.ceil(basePrice * (1 - discount));
      }
      
      default:
        return 0;
    }
  };

  const calculateTotal = () => {
    if (bookingData.packageType === 'custom') {
      return calculatePackagePrice('custom', null);
    }
    
    if (bookingData.selectedPackage) {
      return calculatePackagePrice(bookingData.packageType, bookingData.selectedPackage.value);
    }
    
    return 0;
  };

  const handlePackageSelect = (packageType, value) => {
    setBookingData({
      ...bookingData,
      packageType,
      selectedPackage: { type: packageType, value },
      fromDate: '',
      toDate: ''
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to book a vehicle');
      navigate('/login');
      return;
    }

    // Calculate dates based on package type
    let fromDate, toDate;
    const now = new Date();

    if (bookingData.packageType === 'custom') {
      if (!bookingData.fromDate || !bookingData.toDate) {
        toast.error('Please select both start and end dates');
        return;
      }
      fromDate = bookingData.fromDate;
      toDate = bookingData.toDate;
    } else if (bookingData.selectedPackage) {
      // Set start date to today
      const startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      fromDate = startDate.toISOString().split('T')[0];
      
      const endDate = new Date(startDate);
      
      if (bookingData.packageType === 'hours') {
        // For hours, set end date to tomorrow to ensure it's always after start date
        endDate.setDate(endDate.getDate() + 1);
      } else if (bookingData.packageType === 'days') {
        // For days, add the number of days (end date is start date + days - 1, but we need at least 1 day difference)
        // So for 1 day: end = start + 1 day
        // For 3 days: end = start + 2 days (to cover day 1, 2, 3)
        endDate.setDate(endDate.getDate() + Math.max(1, bookingData.selectedPackage.value - 1));
      } else if (bookingData.packageType === 'months') {
        // For months, add months and ensure at least 1 day difference
        endDate.setMonth(endDate.getMonth() + bookingData.selectedPackage.value);
        // Ensure it's at least 1 day after start
        if (endDate.getTime() <= startDate.getTime()) {
          endDate.setDate(endDate.getDate() + 1);
        }
      }
      
      // Ensure end date is always at least 1 day after start
      if (endDate.getTime() <= startDate.getTime()) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      toDate = endDate.toISOString().split('T')[0];
    } else {
      toast.error('Please select a rental package');
      return;
    }

    // Final validation - ensure end date is after start date
    const from = new Date(fromDate + 'T00:00:00');
    const to = new Date(toDate + 'T00:00:00');
    
    if (to <= from) {
      toast.error('End date must be after start date');
      return;
    }

    setBookingLoading(true);

    try {
      // Calculate the correct total amount based on package type
      const calculatedTotal = calculateTotal();
      
      const result = await bookingService.createBooking({
        vehicleId: id,
        fromDate: fromDate,
        toDate: toDate,
        totalAmount: calculatedTotal // Send the pre-calculated amount for hour-based rentals
      });

      if (result.success) {
        toast.success('Booking created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!vehicle) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link to="/vehicles" className="text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center gap-2 font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Vehicles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 mb-8">
          {/* Vehicle Image and Details */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-200/50">
            <img
              src={(() => {
                if (!vehicle.image) return 'https://via.placeholder.com/400x300?text=Vehicle+Image';
                if (vehicle.image.startsWith('http')) return vehicle.image;
                const path = vehicle.image.startsWith('/') ? vehicle.image : `/${vehicle.image}`;
                const pathParts = path.split('/');
                return pathParts.map(part => part ? encodeURIComponent(part) : part).join('/');
              })()}
              alt={vehicle.vehicleName}
              className="w-full h-96 object-contain rounded-2xl mb-6"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle+Image';
              }}
            />
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                vehicle.vehicleType === 'car' 
                  ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                  : 'bg-accent-100 text-accent-700 border border-accent-200'
              }`}>
                {vehicle.vehicleType.toUpperCase()}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                vehicle.category === 'standard' 
                  ? 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                  : vehicle.category === 'luxury'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : vehicle.category === 'ultraluxury'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : vehicle.category === 'sports'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}>
                {vehicle.category ? vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1) : 'Standard'}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                vehicle.isAvailable 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {vehicle.isAvailable ? '✓ Available' : '✗ Unavailable'}
              </span>
            </div>
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Side - Vehicle Name */}
                <div>
                  <h1 className="text-4xl font-extrabold mb-2 text-neutral-800">{vehicle.vehicleName}</h1>
                  <p className="text-xl text-neutral-500 font-medium">{vehicle.brand}</p>
                </div>
                
                {/* Right Side - Specifications Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {vehicle.maxSpeed && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Max Speed</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.maxSpeed} km/h</p>
                    </div>
                  )}
                  
                  {vehicle.mileage && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Mileage</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.mileage} km/l</p>
                    </div>
                  )}
                  
                  {vehicle.seatCapacity && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Seats</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.seatCapacity} Seats</p>
                    </div>
                  )}
                  
                  {vehicle.fuelType && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Fuel Type</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center capitalize">{vehicle.fuelType}</p>
                    </div>
                  )}
                  
                  {vehicle.transmission && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Transmission</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center capitalize">{vehicle.transmission}</p>
                    </div>
                  )}
                  
                  {vehicle.engine && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Engine</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.engine}</p>
                    </div>
                  )}
                  
                  {vehicle.year && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Year</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.year}</p>
                    </div>
                  )}
                  
                  {vehicle.color && (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <p className="text-xs text-neutral-500 font-medium text-center">Color</p>
                      <p className="text-sm font-semibold text-neutral-700 text-center">{vehicle.color}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-neutral-200/50">
            <h2 className="text-3xl font-extrabold mb-8 text-neutral-800">Book This Vehicle</h2>
            
            {!user ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Please login to book this vehicle</p>
                <Link
                  to="/login"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition inline-block"
                >
                  Login
                </Link>
              </div>
            ) : !vehicle.isAvailable ? (
              <div className="text-center py-8">
                <p className="text-red-600 font-semibold">This vehicle is currently unavailable</p>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                <div className="space-y-6">
                  {/* Hours Package */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Rental Duration - Hours</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[4, 8, 12, 24].map((hours) => {
                        const originalPrice = vehicle ? Math.ceil((vehicle.rentPerDay / 24) * hours) : 0;
                        const discountedPrice = calculatePackagePrice('hours', hours);
                        const discount = hours >= 8 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
                        
                        return (
                          <button
                            key={hours}
                            type="button"
                            onClick={() => handlePackageSelect('hours', hours)}
                            className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all relative ${
                              bookingData.packageType === 'hours' && bookingData.selectedPackage?.value === hours
                                ? 'border-[#9333ea] bg-white text-[#9333ea] shadow-md'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                            }`}
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                          >
                            {discount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                -{discount}%
                              </span>
                            )}
                            <div className="font-bold">{hours} Hours</div>
                            <div className="text-xs mt-1">
                              <span className="text-[#9333ea] font-bold">₹{discountedPrice.toLocaleString('en-IN')}</span>
                              {discount > 0 && (
                                <span className="text-neutral-400 line-through ml-1">₹{originalPrice.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Days Package */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Rental Duration - Days</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[1, 3, 7, 30].map((days) => {
                        const originalPrice = vehicle ? days * vehicle.rentPerDay : 0;
                        const discountedPrice = calculatePackagePrice('days', days);
                        const discount = days > 1 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
                        
                        return (
                          <button
                            key={days}
                            type="button"
                            onClick={() => handlePackageSelect('days', days)}
                            className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all relative ${
                              bookingData.packageType === 'days' && bookingData.selectedPackage?.value === days
                                ? 'border-[#9333ea] bg-white text-[#9333ea] shadow-md'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                            }`}
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                          >
                            {discount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                -{discount}%
                              </span>
                            )}
                            <div className="font-bold">{days} {days === 1 ? 'Day' : 'Days'}</div>
                            <div className="text-xs mt-1">
                              <span className="text-[#9333ea] font-bold">₹{discountedPrice.toLocaleString('en-IN')}</span>
                              {discount > 0 && (
                                <span className="text-neutral-400 line-through ml-1">₹{originalPrice.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Months Package */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Rental Duration - Months</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[1, 3, 6, 12].map((months) => {
                        const originalPrice = vehicle ? (vehicle.rentPerDay * 30 * months) : 0;
                        const discountedPrice = calculatePackagePrice('months', months);
                        const discount = months > 1 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
                        
                        return (
                          <button
                            key={months}
                            type="button"
                            onClick={() => handlePackageSelect('months', months)}
                            className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all relative ${
                              bookingData.packageType === 'months' && bookingData.selectedPackage?.value === months
                                ? 'border-[#9333ea] bg-white text-[#9333ea] shadow-md'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                            }`}
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                          >
                            {discount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                -{discount}%
                              </span>
                            )}
                            <div className="font-bold">{months} {months === 1 ? 'Month' : 'Months'}</div>
                            <div className="text-xs mt-1">
                              <span className="text-[#9333ea] font-bold">₹{discountedPrice.toLocaleString('en-IN')}</span>
                              {discount > 0 && (
                                <span className="text-neutral-400 line-through ml-1">₹{originalPrice.toLocaleString('en-IN')}</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Dates */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-4">Custom Date Range</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingData({ ...bookingData, packageType: 'custom', selectedPackage: null });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        bookingData.packageType === 'custom'
                          ? 'border-[#9333ea] bg-[#9333ea]/10 text-[#9333ea]'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      Select Custom Dates
                    </button>
                    
                    {bookingData.packageType === 'custom' && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={bookingData.fromDate}
                            onChange={(e) => setBookingData({ ...bookingData, fromDate: e.target.value })}
                            className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#9333ea] focus:border-[#9333ea] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            End Date
                          </label>
                          <input
                            type="date"
                            required
                            min={bookingData.fromDate || new Date().toISOString().split('T')[0]}
                            value={bookingData.toDate}
                            onChange={(e) => setBookingData({ ...bookingData, toDate: e.target.value })}
                            className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-[#9333ea] focus:border-[#9333ea] transition-all"
                          />
                        </div>
                        {bookingData.fromDate && bookingData.toDate && (() => {
                          const days = Math.ceil((new Date(bookingData.toDate) - new Date(bookingData.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
                          const originalPrice = vehicle ? days * vehicle.rentPerDay : 0;
                          const discountedPrice = calculatePackagePrice('custom', null);
                          const discount = days >= 3 ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
                          
                          return (
                            <div className="md:col-span-2 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-neutral-700 font-medium">Total Days:</span>
                                <span className="font-bold text-neutral-800">{days}</span>
                              </div>
                              {discount > 0 && (
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-200">
                                  <span className="text-neutral-600 text-sm">Discount Applied:</span>
                                  <span className="font-bold text-green-600">-{discount}%</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Total Price Display */}
                  {calculateTotal() > 0 && (
                    <div className="bg-white p-6 rounded-2xl border-2 border-neutral-200">
                      <div className="text-center">
                        <p className="text-3xl font-black text-[#9333ea] mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          ₹{calculateTotal().toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-neutral-500" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                          per {bookingData.packageType === 'hours' ? 'rental' : bookingData.packageType === 'days' ? 'rental' : bookingData.packageType === 'months' ? 'month' : 'rental'} (incl. VAT)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <button
                    type="submit"
                    disabled={bookingLoading || !vehicle.isAvailable || calculateTotal() === 0}
                    className="w-full bg-[#9333ea] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#7e22ce] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                  >
                    {bookingLoading ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;

