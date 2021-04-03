const faker = require('faker');
const fs = require('fs');

// faker.locale = 'vi';

const randomProductList = (n) => {
  if (n <= 0) return [];

  const productList = [];

  // loop and push product
  Array.from(new Array(n)).forEach(() => {
    const newProduct = {
      id: faker.datatype.uuid(),
      name: faker.commerce.product(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };

    productList.push(newProduct);
  });

  return productList;
};

// IFFE
(() => {
  // random data
  const productList = randomProductList(5);

  // prepare db object
  const db = {
    products: productList,
    categories: [],
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Generate successfully!');
  });
})();
