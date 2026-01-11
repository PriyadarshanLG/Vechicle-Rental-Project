import api from './api';

// Vehicle service for fetching and managing vehicles
export const vehicleService = {
  // Get all vehicles with optional filters
  getAllVehicles: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.vehicleType) params.append('vehicleType', filters.vehicleType);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    // Only append isAvailable if it's explicitly set (not undefined)
    if (filters.isAvailable !== undefined && filters.isAvailable !== null) {
      params.append('isAvailable', String(filters.isAvailable));
    }
    
    const response = await api.get(`/vehicles?${params.toString()}`);
    return response.data;
  },

  // Get single vehicle by ID
  getVehicleById: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  // Create vehicle (Admin only)
  createVehicle: async (vehicleData) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  // Update vehicle (Admin only)
  updateVehicle: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  // Delete vehicle (Admin only)
  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};

