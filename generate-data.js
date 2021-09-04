const faker = require('faker');
const fs = require('fs');
const casual = require('casual');

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

const randomPostList = (n) => {
  if (n <= 0) return [];

  const postList = [];

  Array.from(new Array(n)).forEach(() => {
    const newPost = {
      id: casual.uuid,
      title: casual.title,
      author: casual.full_name,
      description: casual.words(50),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      imageUrl: `https://picsum.photos/id/${casual.integer(1, 1000)}/1368/400`,
    };

    postList.push(newPost);
  });

  return postList;
};

const randomStudentList = (n) => {
  if (n <= 0) return [];

  const studentList = [];

  Array.from(new Array(n)).forEach(() => {
    const newStudent = {
      id: casual.uuid,
      name: casual.full_name,
      age: casual.integer(18, 27),
      mark: Number.parseFloat(casual.double(3, 10).toFixed(1)),
      gender: ['male', 'female'][casual.integer(1, 100) % 2],
      city: ['hcm', 'hn', 'dn', 'ha', 'pt'][casual.integer(1, 100) % 5],

      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    studentList.push(newStudent);
  });

  return studentList;
};

const cityList = [
  {
    code: 'hcm',
    name: 'Hồ Chí Minh',
  },

  {
    code: 'hn',
    name: 'Hà Nội',
  },

  {
    code: 'dn',
    name: 'Đà Nẵng',
  },

  {
    code: 'ha',
    name: 'Hội An',
  },

  {
    code: 'pt',
    name: 'Phan Thiết',
  },
];

// IIFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const postList = randomPostList(50);
  const studentList = randomStudentList(50);

  // prepare db object
  const db = {
    posts: postList,
    products: productList,
    categories: categoryList,
    cities: cityList,
    students: studentList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Generate successfully!');
  });
})();
