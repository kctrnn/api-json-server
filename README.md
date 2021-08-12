# A full fake REST API with json-server 🚀

### Endpoints

`/posts`

- GET /posts

  Supported query params:
  - `_page`: Current page
  - `_limit`: Limit the number of items per page.
  - `_sort`: Indicate which field should be sorted on
  - `_order`: Indicate sort direction


- GET /posts/:postId
- POST /posts
- PUT /posts/:postId
- DELETE /posts/:postId

`/products`

- GET /products
- GET /products/:productId
- POST /products
- PUT /products/:productId
- DELETE /products/:productId



`/categories`

- GET /categories
- GET /categories/:categoryId
- POST /categories
- PUT /categories/:categoryId
- DELETE /categories/:categoryId
