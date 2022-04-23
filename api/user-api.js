const axiosClient = require('./axios-client');

const baseURL = 'http://localhost:3000/api/';

const userApi = {
  getAll() {
    const url = '/users';
    return axiosClient.get(url, { baseURL });
  },

  getById(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url, { baseURL });
  },
};

module.exports = userApi;
