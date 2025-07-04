import axios from './axiosInstance.js';

export const getServices = () => axios.get('/services');