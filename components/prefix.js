import React, {useState} from 'react'
import Link from 'next/link'
import {withStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'

import PrefixIcon from '@material-ui/icons/Poll'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import {generateUrl} from '../lib/url'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

const Prefix = ({classes, prefix, queues, divider, active}) => {
  const [open, setOpen] = useState(true)

  const toggleState = () => {
    setOpen(!open)
  }

  return (
    <>
      {divider && (
        <Divider />
      )}

      <ListItem button onClick={toggleState}>
        <ListItemIcon>
          <PrefixIcon />
        </ListItemIcon>
        <ListItemText inset primary={prefix} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse unmountOnExit in={open} timeout='auto'>
        <List disablePadding component='div'>
          {queues.map(queue => {
            const {href, as} = generateUrl(queue)

            return (
              <Link
                key={queue.name}
                href={href}
                as={as}
              >
                <ListItem button className={classes.nested} selected={active === queue.name}>
                  <ListItemText
                    primary={queue.name}
                  />
                </ListItem>
              </Link>
            )
          })}
        </List>
      </Collapse>
    </>
  )
}

export default withStyles(styles)(Prefix)
