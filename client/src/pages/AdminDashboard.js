import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vehicleService } from '../services/vehicleService';
import { bookingService } from '../services/bookingService';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

// Admin Dashboard component for managing vehicles and bookings
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    vehicleName: '',
    vehicleType: 'car',
    brand: '',
    rentPerDay: '',
    image: '',
    isAvailable: true
  });

  useEffect(() => {
    if (activeTab === 'vehicles') {
      fetchVehicles();
    } else {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getAllVehicles();
      setVehicles(response.data.vehicles || []);
    } catch (error) {
      toast.error('Error fetching vehicles');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getAllBookings();
      setBookings(response.data.bookings || []);
    } catch (error) {
      toast.error('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await vehicleService.updateVehicle(editingVehicle._id, vehicleForm);
        toast.success('Vehicle updated successfully');
      } else {
        await vehicleService.createVehicle(vehicleForm);
        toast.success('Vehicle created successfully');
      }
      setShowVehicleForm(false);
      setEditingVehicle(null);
      setVehicleForm({
        vehicleName: '',
        vehicleType: 'car',
        brand: '',
        rentPerDay: '',
        image: '',
        isAvailable: true
      });
      fetchVehicles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving vehicle');
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      await vehicleService.deleteVehicle(id);
      toast.success('Vehicle deleted successfully');
      fetchVehicles();
    } catch (error) {
      toast.error('Error deleting vehicle');
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleForm({
      vehicleName: vehicle.vehicleName,
      vehicleType: vehicle.vehicleType,
      brand: vehicle.brand,
      rentPerDay: vehicle.rentPerDay,
      image: vehicle.image,
      isAvailable: vehicle.isAvailable
    });
    setShowVehicleForm(true);
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await bookingService.updateBookingStatus(bookingId, { bookingStatus: status });
      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Error updating booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'cancelled':
        return 'bg-slate-100 text-slate-600 border border-slate-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  if (loading && vehicles.length === 0 && bookings.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-50 to-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Admin</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Platform Management
              </h1>
              <p className="text-base text-slate-600 font-medium mt-2">
                Manage vehicles and bookings
              </p>
            </div>
          </div>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Browse Vehicles
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-10 bg-white rounded-xl p-2 shadow-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 ${
              activeTab === 'vehicles'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Vehicles
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                activeTab === 'vehicles' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {vehicles.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-300 ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Bookings
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {bookings.length}
              </span>
            </div>
          </button>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex gap-3 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 px-6 py-3 font-semibold text-sm rounded-md transition-colors ${
              activeTab === 'vehicles'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Vehicles
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                activeTab === 'vehicles' ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
              }`}>
                {vehicles.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 px-6 py-3 font-semibold text-sm rounded-md transition-colors ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Bookings
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                activeTab === 'bookings' ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
              }`}>
                {bookings.length}
              </span>
            </div>
          </button>
        </div>

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div>
            <div className="flex justify-between items-center mb-8 flex-wrap gap-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-1 h-8 bg-slate-900 rounded-sm"></div>
                Manage Vehicles
              </h2>
              <button
                onClick={() => {
                  setShowVehicleForm(true);
                  setEditingVehicle(null);
                  setVehicleForm({
                    vehicleName: '',
                    vehicleType: 'car',
                    brand: '',
                    rentPerDay: '',
                    image: '',
                    isAvailable: true
                  });
                }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-sm transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Vehicle</span>
              </button>
            </div>

            {/* Vehicle Form Modal */}
            {showVehicleForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowVehicleForm(false);
                        setEditingVehicle(null);
                      }}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleVehicleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Vehicle Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleForm.vehicleName}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-colors outline-none text-slate-900"
                        placeholder="e.g., Tesla Model 3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Vehicle Type *
                      </label>
                      <select
                        value={vehicleForm.vehicleType}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleType: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-colors outline-none text-slate-900"
                      >
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Brand *
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleForm.brand}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-colors outline-none text-slate-900"
                        placeholder="e.g., Tesla"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Rent Per Day (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={vehicleForm.rentPerDay}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, rentPerDay: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-colors outline-none text-slate-900"
                        placeholder="e.g., 5000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={vehicleForm.image}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, image: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-colors outline-none text-slate-900"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-lg p-4 border border-gray-200">
                      <input
                        type="checkbox"
                        checked={vehicleForm.isAvailable}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, isAvailable: e.target.checked })}
                        className="w-5 h-5 text-slate-900 border border-gray-300 rounded focus:ring-2 focus:ring-slate-200"
                      />
                      <label className="ml-3 text-sm font-semibold text-slate-700">Mark as Available</label>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg font-semibold shadow-sm transition-colors"
                      >
                        {editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowVehicleForm(false);
                          setEditingVehicle(null);
                        }}
                        className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg font-semibold border border-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Vehicles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <div key={vehicle._id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={(() => {
                        if (!vehicle.image) return 'https://via.placeholder.com/400x300?text=Vehicle+Image';
                        if (vehicle.image.startsWith('http')) return vehicle.image;
                        const path = vehicle.image.startsWith('/') ? vehicle.image : `/${vehicle.image}`;
                        const pathParts = path.split('/');
                        return pathParts.map(part => part ? encodeURIComponent(part) : part).join('/');
                      })()}
                      alt={vehicle.vehicleName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle+Image';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold shadow-sm ${vehicle.isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                        {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {vehicle.vehicleName}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{vehicle.brand}</p>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-xs text-slate-600 mb-1">Rent per day</p>
                        <p className="text-2xl font-bold text-slate-900">
                          ₹{vehicle.rentPerDay}
                        </p>
                      </div>
                      <div className="px-3 py-1.5 bg-slate-100 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-slate-700 uppercase">{vehicle.vehicleType}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditVehicle(vehicle)}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-1 h-8 bg-slate-900 rounded-sm"></div>
              Manage Bookings
            </h2>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow border border-gray-200 p-16 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-slate-900 mb-2 font-bold text-xl">No bookings yet</p>
                  <p className="text-sm text-slate-600">Bookings will appear here once customers start renting vehicles</p>
                </div>
              ) : (
                bookings.map(booking => (
                  <div key={booking._id} className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-xs text-slate-600 uppercase mb-2">Vehicle</p>
                        <h3 className="font-bold text-slate-900 text-base">
                          {booking.vehicleId?.vehicleName}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{booking.vehicleId?.brand}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 uppercase mb-2">Customer</p>
                        <p className="text-sm font-semibold text-slate-900">{booking.userId?.name}</p>
                        <p className="text-sm text-slate-600">{booking.userId?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 uppercase mb-2">Dates & Amount</p>
                        <p className="text-sm text-slate-700 mb-2">
                          {new Date(booking.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(booking.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          ₹{booking.totalAmount?.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 uppercase mb-2">Status & Actions</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${getStatusColor(booking.bookingStatus)}`}>
                          <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                          {booking.bookingStatus.toUpperCase()}
                        </span>
                        {booking.bookingStatus === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, 'approved')}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateBookingStatus(booking._id, 'rejected')}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

