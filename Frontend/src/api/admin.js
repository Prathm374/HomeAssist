import axios from './axiosInstance.js';

// Dashboard Stats
export const fetchAdminStats = () => axios.get('/admin/stats');

// Users
export const getAllUsers = () => axios.get('/admin/users');
export const updateUserById = (id, data) => axios.put(`/admin/users/${id}`, data);
export const deleteUserById = (id) => axios.delete(`/admin/users/${id}`);

// Orders
export const getAllOrders = () => axios.get('/admin/orders');
export const updateOrderById = (id, data) => axios.put(`/admin/orders/${id}`, data);
export const deleteOrderById = (id) => axios.delete(`/admin/orders/${id}`);

// Services
export const getAllServices = () => axios.get('/admin/services');
export const updateServiceById = (id, data) => axios.put(`/admin/services/${id}`, data);
export const deleteServiceById = (id) => axios.delete(`/admin/services/${id}`);