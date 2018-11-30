function getConfig() {
  let prefix
  let queues = []

  try {
    ({prefix, queues} = require('../config.json'))
  } catch (error) {
    console.error('Could not find a config.json file')
  }

  return {
    prefix,
    queues
  }
}

module.exports = {getConfig}
