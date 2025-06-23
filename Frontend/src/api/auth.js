import axios from "./axiosInstance.js";

export const signup = (credentials) => axios.post('/auth/register', credentials);
export const login = (credentials) => axios.post('/auth/login', credentials);
export const getMe = () => axios.get('/auth/me');
export const google = (credential) => axios.post('/auth/google', { credential });