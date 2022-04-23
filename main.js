require('dotenv').config();

const jsonServer = require('json-server');
const queryString = require('query-string');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const protectedRoute = require('./middlewares/protectedRoute');

const PORT = process.env.PORT || 3000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  const now = Date.now();
  switch (req.method) {
    case 'POST': {
      req.body.createdAt = now;
      req.body.updatedAt = now;
    }
    case 'PATCH': {
      req.body.updatedAt = now;
    }
  }
  // Continue to JSON Server router
  next();
});

server.post('/api/login', authController.login);
server.post('/api/register', authController.register);
server.get('/api/profile', protectedRoute, userController.getMe);

// private apis
server.use('/api/private', protectedRoute, router);

// Customize response
router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];

  if (req.method === 'GET' && totalCountHeader) {
    // Retrieve request pagination
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };

    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);
server.listen(PORT, () => {
  console.log('JSON Server is running at port', PORT);
});
