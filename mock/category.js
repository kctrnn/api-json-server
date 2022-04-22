const uniqid = require('uniqid');

const categoryList = [
  {
    id: uniqid(),
    name: 'Thời trang',
    searchTerm: 'ao so mi nu',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uniqid(),
    name: 'Khẩu trang',
    searchTerm: 'khau trang',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uniqid(),
    name: 'Làm đẹp',
    searchTerm: 'lam dep',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uniqid(),
    name: 'Laptop',
    searchTerm: 'macbook',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uniqid(),
    name: 'Ổ cứng',
    searchTerm: 'o cung ssd',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: uniqid(),
    name: 'Điện thoại',
    searchTerm: 'iphone',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

module.exports = categoryList;
