import axios from "./axiosInstance.js";

export const createOrder = (data) => axios.post('/orders', data);
export const updateOrder = (id, data) => axios.put(`orders/${id}`, data);
export const cancelOrder = (id) => axios.patch(`/orders/${id}/cancel`);
export const completeOrder = (id) => axios.patch(`/orders/${id}/complete`);
export const getOrders = () => axios.get('/orders');