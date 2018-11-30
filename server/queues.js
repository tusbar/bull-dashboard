const Queue = require('bull')

const {getConfig} = require('./config')

const {REDIS_URL} = process.env

const DEFAULT_PREFIX = 'bull'

const config = getConfig()

const queues = []
for (const {prefix = DEFAULT_PREFIX, names, redisUrl} of config.queues) {
  for (const name of names) {
    queues.push({
      prefix,
      name,
      queue: new Queue(name, {
        redis: redisUrl || REDIS_URL || 'redis://localhost:6379',
        prefix
      })
    })
  }
}

function getQueues() {
  return queues.map(({prefix, name}) => ({
    prefix,
    name
  }))
}

async function getQueue(prefix, name, params) {
  prefix = prefix || DEFAULT_PREFIX

  const res = queues.find(
    q => q.prefix === prefix && q.name === name
  )

  if (!res) {
    return null
  }

  const counts = await res.queue.getJobCounts()

  let jobs = []
  if (params.status) {
    jobs = await res.queue.getJobs([
      params.status
    ], 0, 10)
  }

  return {
    prefix: res.prefix,
    name: res.name,
    counts,
    jobs
  }
}

module.exports = {
  queues,
  getQueue,
  getQueues
}
