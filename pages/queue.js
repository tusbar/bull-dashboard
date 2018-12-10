import React, {useState, useEffect} from 'react'
import getConfig from 'next/config'
import {withStyles} from '@material-ui/core/styles'
import Router from 'next/router'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Job from '../components/job'

import {generateUrl} from '../lib/url'

const {publicRuntimeConfig: {
  API_URL
}} = getConfig()

const fetchQueue = async (prefix, name, params) => {
  params = {
    status: 'active',
    ...params
  }

  const url = `${API_URL}/queues/${prefix}/${name}?${
    new URLSearchParams(params).toString()
  }`

  const res = await fetch(url)

  return res.json()
}

const styles = theme => ({
  appbar: {
    boxShadow: 'none',
    marginBottom: theme.spacing.unit
  }
})

const QueuePage = ({classes, initialQueue, initialParams}) => {
  const [queue, setQueue] = useState(initialQueue)
  const [params, setParams] = useState(initialParams)

  useEffect(() => {
    setParams(initialParams)
    setQueue(initialQueue)
  }, [initialQueue, initialParams])

  useEffect(() => {
    const handle = setInterval(async () => {
      setQueue(
        await fetchQueue(queue.prefix, queue.name, params)
      )
    }, 2000)

    return () => {
      clearInterval(handle)
    }
  }, [queue, params])

  const updateSelectedTab = (e, value) => {
    const newParams = {
      ...params,
      status: value
    }

    setParams(newParams)

    const {href, as} = generateUrl(queue, newParams)
    Router.replace(href, as)
  }

  return (
    <>
      <AppBar
        position='static'
        variant='dense'
        color='default'
        className={classes.appbar}
      >
        <Tabs
          value={params.status}
          indicatorColor='primary'
          textColor='primary'
          onChange={updateSelectedTab}
        >
          {Object.entries(queue.counts).map(([name, count]) => (
            <Tab
              key={name}
              value={name}
              label={`${name} (${count})`}
            />
          ))}
        </Tabs>
      </AppBar>

      {queue.jobs && (
        <div>
          {queue.jobs.map(job => (
            <Job key={job.id} job={job} status={params.status} />
          ))}
        </div>
      )}
    </>
  )
}

QueuePage.getInitialProps = async ({query}) => {
  const {prefix, queue: name, ...params} = query

  const queue = await fetchQueue(prefix, name, params)

  return {
    initialQueue: queue,
    initialParams: {
      status: 'active',
      ...params
    }
  }
}

export default withStyles(styles)(QueuePage)
