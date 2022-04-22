const axios = require('axios');

const axiosClient = axios.create({
  baseURL: 'https://mapi.sendo.vn/mob',
  'Content-Type': 'application/json',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

module.exports = axiosClient;
