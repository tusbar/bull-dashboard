const {Router} = require('express')

const {getQueues, getQueue} = require('./queues')

const router = new Router()

router.get('/queues/:prefix/:queue', async (req, res) => {
  const queue = await getQueue(
    req.params.prefix,
    req.params.queue,
    req.query
  )

  res.send(queue)
})

router.get('/queues', (req, res) => {
  const queues = getQueues()

  res.send(queues)
})

module.exports = router
