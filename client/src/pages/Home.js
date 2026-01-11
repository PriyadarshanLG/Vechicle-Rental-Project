import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import VehicleCard from '../components/VehicleCard';
import Loading from '../components/Loading';

// Vehicle Listing page component (moved from Home)
const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicleType: '',
    category: '',
    isAvailable: undefined
  });

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getAllVehicles(filters);
      // Handle both response structures: response.data.vehicles or response.vehicles
      const vehiclesList = response?.data?.vehicles || response?.vehicles || [];
      setVehicles(vehiclesList);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setVehicles([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24">
      {/* Hero Header Section */}
      <div className="text-white py-20 relative overflow-hidden min-h-[600px] flex items-center">
        {/* Video Background - Rotated 90 degrees counterclockwise, maximum quality */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute z-0"
          style={{
            width: '300vh',
            height: '300vw',
            minWidth: '300vh',
            minHeight: '300vw',
            objectFit: 'cover',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center center',
            top: '50%',
            left: '50%',
            marginTop: '-150vw',
            marginLeft: '-150vh',
            imageRendering: 'crisp-edges',
            WebkitImageRendering: '-webkit-optimize-contrast',
            willChange: 'auto',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <source src="/car.mp4" type="video/mp4" />
        </video>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 
              className="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] opacity-0"
              style={{
                animation: 'fadeInUpSlow 1s ease-out 0.2s forwards',
                textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              Premium Vehicle Rental
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/95 mb-12 font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)] opacity-0"
              style={{
                animation: 'fadeInUpSlow 1s ease-out 0.5s forwards',
                textShadow: '0 2px 15px rgba(0,0,0,0.7), 0 1px 5px rgba(0,0,0,0.5)'
              }}
            >
              Discover our curated collection of premium cars and motorcycles. Experience luxury, performance, and style.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div 
                className="bg-white/10 backdrop-blur-lg px-6 py-6 rounded-2xl border border-white/20 shadow-2xl opacity-0"
                style={{
                  animation: 'fadeInScale 0.8s ease-out 0.8s forwards'
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{vehicles.length}</span>
                </div>
                <p className="text-sm text-white/90 font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">Vehicles Available</p>
              </div>
              <div 
                className="bg-white/10 backdrop-blur-lg px-6 py-6 rounded-2xl border border-white/20 shadow-2xl opacity-0"
                style={{
                  animation: 'fadeInScale 0.8s ease-out 1s forwards'
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Best Rates</span>
                </div>
                <p className="text-sm text-white/90 font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">Transparent Pricing</p>
              </div>
              <div 
                className="bg-white/10 backdrop-blur-lg px-6 py-6 rounded-2xl border border-white/20 shadow-2xl opacity-0"
                style={{
                  animation: 'fadeInScale 0.8s ease-out 1.2s forwards'
                }}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">24/7</span>
                </div>
                <p className="text-sm text-white/90 font-medium drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">Online Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div 
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 opacity-0"
          style={{
            animation: 'fadeInScale 0.8s ease-out 1.4s forwards'
          }}
        >
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
              <svg className="w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Search & Filter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 mb-2 drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">
                Vehicle Type
              </label>
              <div className="relative">
                <select
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3.5 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/15 hover:border-white/40 shadow-lg appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800 text-white">All Types</option>
                  <option value="car" className="bg-slate-800 text-white">🚗 Car</option>
                  <option value="bike" className="bg-slate-800 text-white">🏍️ Motorcycle</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 mb-2 drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3.5 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/15 hover:border-white/40 shadow-lg appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800 text-white">All Categories</option>
                  <option value="standard" className="bg-slate-800 text-white">Standard</option>
                  <option value="luxury" className="bg-slate-800 text-white">Luxury</option>
                  <option value="ultraluxury" className="bg-slate-800 text-white">Ultra Luxury</option>
                  <option value="sports" className="bg-slate-800 text-white">Sports</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 mb-2 drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]">
                Availability
              </label>
              <div className="relative">
                <select
                  name="isAvailable"
                  value={filters.isAvailable === undefined ? '' : String(filters.isAvailable)}
                  onChange={(e) => setFilters(prev => ({ ...prev, isAvailable: e.target.value === '' ? undefined : e.target.value === 'true' }))}
                  className="w-full px-4 py-3.5 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/15 hover:border-white/40 shadow-lg appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800 text-white">All Vehicles</option>
                  <option value="true" className="bg-slate-800 text-white">✓ Available</option>
                  <option value="false" className="bg-slate-800 text-white">✗ Unavailable</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ vehicleType: '', category: '', isAvailable: undefined })}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3.5 rounded-xl font-semibold transition-all border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-3">
              Our Fleet
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              Discover <span className="font-bold text-primary-400">{vehicles.length}</span> premium {vehicles.length === 1 ? 'vehicle' : 'vehicles'} ready for your journey
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium">Grid View</span>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-36 h-36 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-700/50">
              <svg className="w-20 h-20 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-2xl font-bold mb-3">No vehicles found</p>
            <p className="text-slate-500 text-lg">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {vehicles.map(vehicle => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

