require('dotenv').config();
const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const yup = require('yup');
const jwt = require('jsonwebtoken');
const casual = require('casual');

const PORT = process.env.PORT || 3000;
const PRIVATE_KEY = 'ae9468ec-c1fe-4cce-9772-cd899a2b496a';
const SECONDS_PER_DAY = 60 * 60 * 24;

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

server.post('/api/login', async (req, res) => {
  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required('Missing username')
      .min(4, 'username should have at least 4 characters'),

    password: yup
      .string()
      .required('Missing password')
      .min(6, 'password should have at least 6 characters'),
  });

  try {
    await loginSchema.validate(req.body);
  } catch (error) {
    res
      .status(400)
      .jsonp({ error: error.errors?.[0] || 'Invalid username or password' });
  }

  // validate username and password
  const user = req.body;
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: SECONDS_PER_DAY,
  });
  const expiredAt = new Date(Date.now() + SECONDS_PER_DAY * 1000).getTime();

  // if valid, generate a JWT and return, set it expired in 1 day
  res.jsonp({ accessToken: token, expiredAt });
});

server.post('/api/register', async (req, res) => {
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .required('Missing username')
      .min(4, 'username should have at least 4 characters'),
    name: yup
      .string()
      .required('Missing name')
      .min(6, 'username should have at least 6 characters'),

    email: yup
      .string()
      .required('Missing email')
      .email('please enter a valid email address'),

    password: yup
      .string()
      .required('Missing password')
      .min(6, 'password should have at least 6 characters'),
  });

  try {
    await registerSchema.validate(req.body);
  } catch (error) {
    res
      .status(400)
      .jsonp({ error: error.errors?.[0] || 'Invalid username or password' });
  }

  // validate username and password
  const user = req.body;
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: SECONDS_PER_DAY,
  });
  const expiredAt = new Date(Date.now() + SECONDS_PER_DAY * 1000).getTime();

  // if valid, generate a JWT and return, set it expired in 1 day
  res.jsonp({ accessToken: token, expiredAt });
});

function protectedRoute(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: 'You need to login to access' });

    const [tokenType, accessToken] = authHeader.split(' ');
    if (tokenType !== 'Bearer') {
      return res
        .status(401)
        .json({ message: 'Invalid token type. Only "Bearer" supported' });
    }

    jwt.verify(accessToken, PRIVATE_KEY);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Access token is not valid or expired' });
  }
}

server.get('/api/profile', protectedRoute, (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const [tokenType, accessToken] = authHeader.split(' ');
    const payload = jwt.decode(accessToken);

    return res.status(200).json({
      username: payload.username,
      name: payload.name || '',
      email: payload.email || '',
    });
  } catch (error) {
    console.log('failed to parse token', error);
    return res.status(400).json({ message: 'Failed to parse token' });
  }
});

// private apis
server.use('/api/private', protectedRoute, router);

router.render = (req, res) => {
  // check GET with pagination
  // if yes, custom output
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];

  if (totalCountHeader && req.method === 'GET') {
    const queryParams = queryString.parse(req._parsedUrl.search);
    // "?_page=1&_limit=3" -> {_page: '1', _limit='3'}

    const result = {
      data: res.locals.data,
      pagination: {
        _page: parseInt(queryParams._page) || 1,
        _limit: parseInt(queryParams._limit) || 10,
        _totalRows: totalCountHeader,
      },
    };

    return res.jsonp(result);
  }

  // otherwise, keep default behavior
  res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);
server.listen(PORT, () => {
  console.log('JSON Server is running');
});
