import React from 'react'
import {groupBy} from 'lodash'
import {withStyles} from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

import Prefix from './prefix'

const drawerWidth = 260

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    overflow: 'auto'
  }
})

const Layout = ({classes, children, queues, query}) => {
  const byPrefix = groupBy(queues, 'prefix')

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <List>
          {Object.entries(byPrefix).map(([prefix, queues], index) => (
            <Prefix
              key={prefix}
              prefix={prefix}
              queues={queues}
              divider={index > 0}
              active={query.queue}
            />
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        {children}
      </main>
    </div>
  )
}

export default withStyles(styles)(Layout)
