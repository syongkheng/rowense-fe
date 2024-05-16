import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "here",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from session storage
    const token = sessionStorage.getItem('jwt');

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
