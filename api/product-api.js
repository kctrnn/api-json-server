const axiosClient = require('./axios-client');

const productApi = {
  getAll(queryParams) {
    const url = '/product/search';
    return axiosClient.get(url, { params: queryParams });
  },

  get(productId) {
    const url = `/product/${productId}/detail`;
    return axiosClient.get(url);
  },
};

module.exports = productApi;
