import api from './api';

// Booking service for managing vehicle rentals
export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Get user's bookings
  getUserBookings: async (userId = null) => {
    const endpoint = userId ? `/bookings/user/${userId}` : '/bookings/my-bookings';
    const response = await api.get(endpoint);
    return response.data;
  },

  // Get all bookings (Admin only)
  getAllBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  // Update booking status (Admin only)
  updateBookingStatus: async (bookingId, statusData) => {
    const response = await api.put(`/bookings/${bookingId}/status`, statusData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    const response = await api.put(`/bookings/${bookingId}/cancel`);
    return response.data;
  }
};

