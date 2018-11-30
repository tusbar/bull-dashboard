const express = require('express')
const next = require('next')
const compression = require('compression')

const api = require('./api')

const port = parseInt(process.env.PORT, 10) || 3004
const dev = process.env.NODE_ENV !== 'production'
const napp = next({dev})
const handle = napp.getRequestHandler()

async function main() {
  await napp.prepare()
  const server = express()

  if (!dev) {
    server.use(compression())
  }

  server.use('/api', api)

  server.get('/queues/:prefix/:queue', (req, res) => {
    napp.render(req, res, '/queue', {
      ...req.query,
      prefix: req.params.prefix,
      queue: req.params.queue
    })
  })

  server.get('*', handle)

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
}

main()
