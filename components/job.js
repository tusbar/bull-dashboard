import React, {useState} from 'react'

import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Prism} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/styles/prism'

const styles = theme => ({
  card: {
    marginBottom: 12
  },
  cardHeader: {
    overflow: 'hidden'
  },
  actions: {
    display: 'flex'
  },
  code: {
    fontSize: 12
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: blue[500]
  },
  'avatar.failed': {
    backgroundColor: red[500]
  },
  overflow: {
    overflow: 'auto'
  }
})

const Job = React.memo(({classes, job, status}) => {
  const [expanded, setExpanded] = useState(false)

  const onExpand = () => {
    setExpanded(!expanded)
  }

  const hasStackTraces = job.stacktrace && job.stacktrace.length > 0

  return (
    <Card className={classes.card}>
      <CardActionArea disableRipple onClick={onExpand}>
        <CardHeader
          avatar={
            <Avatar className={classes[`avatar.${status}`] || classes.avatar}>
              J
            </Avatar>
          }
          title={job.data.name || job.name}
          titleTypographyProps={{
            noWrap: true
          }}
          subheader={job.id}
          classes={{
            content: classes.cardHeader
          }}
        />
      </CardActionArea>
      <Collapse in={expanded} timeout={0}>
        <CardContent>
          {job.data && (
            <>
              <Typography>Data:</Typography>
              <Prism language='json' style={atomDark} className={classes.code}>
                {JSON.stringify(job.data, null, 2)}
              </Prism>
            </>
          )}
          {job.opts && (
            <>
              <Typography>Options:</Typography>
              <Prism language='json' style={atomDark} className={classes.code}>
                {JSON.stringify(job.opts, null, 2)}
              </Prism>
            </>
          )}
          {hasStackTraces && (
            <>
              <Typography>Errors:</Typography>
              {job.stacktrace.map((stack, id) => ( // eslint-disable-next-line react/no-array-index-key
                <Prism key={id} style={atomDark} className={classes.code}>
                  {job.stacktrace.join('\n')}
                </Prism>
              ))}
            </>
          )}
        </CardContent>
      </Collapse>
      {job.progress > 0 && (
        <LinearProgress variant='determinate' value={job.progress} />
      )}
    </Card>
  )
})

export default withStyles(styles)(Job)
