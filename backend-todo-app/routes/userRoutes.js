const UserController = require('../controllers/userController');

async function userRoutes(fastify, _options) {
  fastify.post('/register', UserController.registerUser);
  fastify.post('/login', UserController.loginUser);
}

module.exports = userRoutes;
