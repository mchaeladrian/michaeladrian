// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const path = require('path')

// Register Plugins
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
});
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public/assets'),
  prefix: '/assets',
  decorateReply: false,
});
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public/forms'),
  prefix: '/forms', // optional: default '/'
  decorateReply: false,
});

// Declare a route
fastify.get('/', async (request, reply) => {
  reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

// Declare a route
fastify.get('/apaya', async (request, reply) => {
  return { hello: 'apaya' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()