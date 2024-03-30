const TaskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

async function taskRoutes(fastify, _options) {
  fastify.post('/create', { preHandler: authController }, TaskController.createTask);
  fastify.get('/user-tasks', { preHandler: authController }, TaskController.getTasksByUser);
  fastify.delete('/delete', { preHandler: authController }, TaskController.deleteTask);
  fastify.put('/edit', { preHandler: authController }, TaskController.editTask);
}

module.exports = taskRoutes;
