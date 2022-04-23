const uniqid = require('uniqid');

const userList = [
  {
    id: uniqid(),
    username: 'kctrnn',
    firstName: 'Chan',
    lastName: 'Kim',
    password: '$2b$10$LMSnnUNV8GKnjqkwK7.hR.iAtZHWZwwFncZsIw74ra7tt/Hn1Z/XK', // 030912 - 10
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

module.exports = userList;
