require('dotenv').config();
const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
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

    jwt.verify(accessToken, process.env.PRIVATE_KEY);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: 'Access token is not valid or expired' });
  }
};

module.exports = protectedRoute;
