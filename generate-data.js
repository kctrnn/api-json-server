const faker = require('faker');
const fs = require('fs');
const casual = require('casual');
const axios = require('axios');

// axios client
const axiosClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'content-type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
  }
);

const catApi = {
  getCatList() {
    const url = '/breeds';
    return axiosClient.get(url);
  },
};

const mapToCat = (cat) => ({
  id: cat.id,
  name: cat.name,
  description: cat.description,

  origin: cat.origin,
  temperament: cat.temperament,
  life_span: cat.life_span,

  adaptability: cat.adaptability,
  affection_level: cat.affection_level,
  child_friendly: cat.child_friendly,
  grooming: cat.grooming,
  intelligence: cat.intelligence,
  health_issues: cat.health_issues,
  social_needs: cat.social_needs,
  stranger_friendly: cat.stranger_friendly,

  image: {
    ...cat.image,
  },

  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const fetchCatList = async () => {
  const catList = await catApi.getCatList();
  const transformedCatList = catList.map(mapToCat);

  return transformedCatList;
};

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
        createdAt: Date.now(),
        updatedAt: Date.now(),
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

const photoList = [
  {
    label: 'Vibe photo 400',
    url: 'https://images.unsplash.com/photo-1633524417716-9326600b43a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    label: 'Alone',
    url: 'https://images.unsplash.com/photo-1633524418799-a314f8ee40de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    label: 'Bar',
    url: 'https://images.unsplash.com/photo-1633524418328-ad79c090329d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80',
    createdAt: Date.now(),
  },
  {
    label: 'Sidestep',
    url: 'https://images.unsplash.com/photo-1633660483633-d4aec0aba670?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=378&q=80',
    createdAt: Date.now(),
  },
  {
    label:
      'An in-camera double film exposure of a child in silhouette with daisies and sunshine',
    url: 'https://images.unsplash.com/photo-1626861084819-20cdedc9c8d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    createdAt: Date.now(),
  },
  {
    label: "Central Coast California images on film back in the early 2000's",
    url: 'https://images.unsplash.com/photo-1633639376674-9bc601e00bba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1164&q=80',
    createdAt: Date.now(),
  },
  {
    label: 'Motorcycle. Leica R7 (1994), Summilux-R 1.4 50mm (1983)',
    url: 'https://images.unsplash.com/photo-1633502401802-de56208cf890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80',
    createdAt: Date.now(),
  },
];

// IIFE
(async () => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);
  const postList = randomPostList(50);
  const studentList = randomStudentList(50);
  const catList = await fetchCatList();

  // prepare db object
  const db = {
    posts: postList,
    products: productList,
    categories: categoryList,
    cities: cityList,
    students: studentList,
    cats: catList,
    photos: photoList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('Generate data successfully =))');
  });
})();
