import React from 'react';
import { Link } from 'react-router-dom';

// Helper function to get image URL - handles public folder paths and URL encoding
const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/400x300?text=Vehicle+Image';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For local paths, ensure they start with / 
  let cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Split path into segments and encode each part to handle special characters like brackets
  const pathParts = cleanPath.split('/');
  const encodedParts = pathParts.map((part, index) => {
    // Keep empty strings (for leading slash)
    if (!part) return part;
    // Encode each segment to handle brackets, spaces, and other special chars
    return encodeURIComponent(part);
  });
  
  return encodedParts.join('/');
};

// Vehicle Card component for displaying vehicle information
const VehicleCard = ({ vehicle }) => {
  // Get vehicle type label
  const getVehicleTypeLabel = () => {
    if (vehicle.vehicleType === 'car') {
      if (vehicle.category === 'sports') return 'SPORTS';
      if (vehicle.seatCapacity && vehicle.seatCapacity >= 7) return 'SUV';
      if (vehicle.category === 'luxury' || vehicle.category === 'ultraluxury') return 'SEDAN';
      return 'HATCHBACK';
    }
    return 'BIKE';
  };

  // Get year or use default
  const vehicleYear = vehicle.year || '2024';

  return (
    <Link 
      to={`/vehicles/${vehicle._id}`}
      className="group bg-[#f5f5f5] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-[#e0e0e0] hover:border-[#d0d0d0] transform hover:-translate-y-1"
    >
      {/* Vehicle Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-2xl font-bold text-[#2d2d2d] mb-4 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          {vehicle.vehicleName}
        </h3>
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1.5 bg-white border border-[#d0d0d0] rounded-md text-xs font-semibold text-[#2d2d2d] uppercase tracking-wide">
            {getVehicleTypeLabel()}
          </span>
          <span className="px-3 py-1.5 bg-white border border-[#d0d0d0] rounded-md text-xs font-semibold text-[#2d2d2d]">
            {vehicleYear}
          </span>
        </div>
      </div>

      {/* Vehicle Image */}
      <div className="relative h-72 bg-[#e8e8e8] overflow-hidden">
        <img
          src={getImageUrl(vehicle.image)}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle+Image';
          }}
        />
      </div>

      {/* Vehicle Features */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-8 mb-5 pb-5 border-b border-[#e0e0e0]">
          {vehicle.seatCapacity && (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-[#4a4a4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-semibold text-[#4a4a4a]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {vehicle.seatCapacity} Seats
              </span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6 text-[#4a4a4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-semibold text-[#4a4a4a] capitalize" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {vehicle.transmission}
              </span>
            </div>
          )}
        </div>
        
        {/* Pricing & Action */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-[#6a6a6a] mb-1.5 font-medium" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Starting from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#9333ea]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                ₹{vehicle.rentPerDay?.toLocaleString('en-IN')}
              </span>
              <span className="text-[#6a6a6a] text-sm font-medium ml-1" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                /day
              </span>
            </div>
          </div>
          <div 
            className="px-6 py-2.5 bg-white border-2 border-[#9333ea] rounded-xl font-semibold text-sm text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-center"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

