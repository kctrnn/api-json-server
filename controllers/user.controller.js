const userApi = require('../api/user-api');
const jwt = require('jsonwebtoken');

const userController = {
  getMe: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const [tokenType, accessToken] = authHeader.split(' ');
      const payload = jwt.decode(accessToken);

      const user = await userApi.getById(payload.sub);
      delete user['password'];

      return res.json({
        user: user,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Failed to get profile' });
    }
  },
};

module.exports = userController;
