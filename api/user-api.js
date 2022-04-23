const axiosClient = require('./axios-client');

const config = {
  baseURL: 'http://localhost:3000/api/',
};

const userApi = {
  getAll() {
    const url = '/users';
    return axiosClient.get(url, config);
  },

  getById(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url, config);
  },

  create(data) {
    const url = '/users';
    return axiosClient.post(url, data, config);
  },

  update(id, data) {
    const url = `/users/${id}`;
    return axiosClient.patch(url, data, config);
  },
};

module.exports = userApi;
