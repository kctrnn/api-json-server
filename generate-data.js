const faker = require('faker');
const fs = require('fs');

// faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const newProduct = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailUrl: faker.image.imageUrl(),
        createAt: Date.now(),
        updateAt: Date.now(),
      };

      productList.push(newProduct);
    });
  }

  return productList;
};

// IIFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    products: productList,
    categories: categoryList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Generate successfully!');
  });
})();
