import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

// User Dashboard with statistics and booking management
const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0,
    completedBookings: 0
  });

  useEffect(() => {
    if (user) {
      fetchBookings();
      const interval = setInterval(() => {
        fetchBookings();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getUserBookings();
      const bookingsData = response.data.bookings || [];
      setBookings(bookingsData);
      
      const totalBookings = bookingsData.length;
      const activeBookings = bookingsData.filter(b => ['pending', 'approved'].includes(b.bookingStatus)).length;
      const completedBookings = bookingsData.filter(b => b.bookingStatus === 'completed').length;
      const totalSpent = bookingsData
        .filter(b => ['completed', 'approved'].includes(b.bookingStatus))
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
      
      setStats({
        totalBookings,
        activeBookings,
        totalSpent,
        completedBookings
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error fetching bookings';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const result = await bookingService.cancelBooking(bookingId);
      if (result.success) {
        toast.success('Booking cancelled successfully');
        fetchBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling booking');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const activeBookingsList = bookings.filter(b => ['pending', 'approved'].includes(b.bookingStatus));
  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(b => b.bookingStatus === filterStatus);
  const recentBookings = filteredBookings.slice(0, 10);
  
  const getDaysUntilBooking = (booking) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(booking.fromDate);
    bookingDate.setHours(0, 0, 0, 0);
    const diffTime = bookingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-sky-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-2 h-20 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-2xl"></div>
                  <div className="absolute inset-0 w-2 h-20 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-sm animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>
                  </h1>
                </div>
              </div>
            </div>
            <Link
              to="/home"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="relative z-10">Browse Vehicles</span>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Total Bookings */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalBookings}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Total Bookings</p>
          </div>

          {/* Active Bookings */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.activeBookings}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Active Bookings</p>
          </div>

          {/* Completed Bookings */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.completedBookings}</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Completed Bookings</p>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Spent</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">₹{(stats.totalSpent / 1000).toFixed(1)}k</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600">Amount Spent</p>
          </div>
        </div>

        {/* Active Bookings Section */}
        {activeBookingsList.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Active Bookings</h2>
              <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                {activeBookingsList.length} {activeBookingsList.length === 1 ? 'booking' : 'bookings'}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeBookingsList.map(booking => {
                const daysUntil = getDaysUntilBooking(booking);
                return (
                  <div key={booking._id} className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {booking.vehicleId?.vehicleName || 'Vehicle'}
                          </h3>
                          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{booking.vehicleId?.brand}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-5 flex-wrap">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                            {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                          </span>
                          {daysUntil >= 0 && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                            </span>
                          )}
                        </div>
                        <div className="space-y-3 bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="flex items-center gap-3 text-sm text-slate-700">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-medium"><strong className="font-semibold text-slate-900">From:</strong> {new Date(booking.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-700">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-medium"><strong className="font-semibold text-slate-900">To:</strong> {new Date(booking.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end sm:items-end gap-4">
                        <div className="text-right bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <p className="text-2xl font-bold text-slate-900 mb-1">
                            ₹{booking.totalAmount?.toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Total Amount</p>
                        </div>
                        {['pending', 'approved'].includes(booking.bookingStatus) && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="w-full px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-semibold shadow-sm hover:shadow-md"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Bookings Section */}
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Booking History</h2>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Filter Buttons */}
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                {['all', 'pending', 'approved', 'completed', 'cancelled', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
                      filterStatus === status
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {bookings.length > 10 && (
                <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                  {filteredBookings.length} total
                </span>
              )}
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-slate-900 mb-3 font-bold text-2xl">No bookings found</p>
              <p className="text-base text-slate-600 mb-8 font-medium">Start your journey by exploring our vehicle collection</p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                Browse Vehicles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-900 mb-2 font-bold text-xl">No {filterStatus} bookings</p>
              <p className="text-base text-slate-600 font-medium">Try selecting a different filter</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Vehicle</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Dates</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {recentBookings.map((booking, index) => (
                      <tr key={booking._id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{booking.vehicleId?.vehicleName || 'N/A'}</div>
                            <div className="text-sm text-slate-500 font-medium">{booking.vehicleId?.brand || ''}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {new Date(booking.fromDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-sm text-slate-500">
                            to {new Date(booking.toDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-900">
                            ₹{booking.totalAmount?.toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(booking.bookingStatus)}`}>
                            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                            {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {['pending', 'approved'].includes(booking.bookingStatus) && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold hover:shadow-md transition-all duration-200 text-xs"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
