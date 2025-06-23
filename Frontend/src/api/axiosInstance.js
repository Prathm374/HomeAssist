import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        const customErr = {
            ...err,
            message: err.response?.data?.message || err.message
        };
        return Promise.reject(customErr);
    }
);

export default axiosInstance;