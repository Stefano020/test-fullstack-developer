const fastify = require('fastify')({ logger: true });
require('dotenv').config();

fastify.options('/api/users/login', async (request, reply) => {
  reply
    .code(204)
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'POST')
    .send();
});

fastify.register(require('./routes/userRoutes'), { prefix: '/api/users' });
fastify.register(require('./routes/taskRoutes'), { prefix: '/api/tasks' });

fastify.get('/api/status', async (_req, _res) => {
  return { status: 'Server is running' };
});

const PORT = process.env.PORT || 2001;

fastify.listen({ port: PORT })
  .then(() => {
    console.log(`Server is running on port ${PORT}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
