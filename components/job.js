import React, {useState} from 'react'

import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import LinearProgress from '@material-ui/core/LinearProgress'

import CodeBlock from './code-block'

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
  overflow: {
    overflow: 'auto'
  }
})

const Job = React.memo(({classes, job}) => {
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
            <Avatar className={classes.avatar}>
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
          <Grid container spacing={16}>
            <Grid item xs={hasStackTraces ? 4 : 6} className={classes.overflow}>
              {job.data && (
                <>
                  <Typography>Data:</Typography>
                  <CodeBlock>
                    {JSON.stringify(job.data, null, 2)}
                  </CodeBlock>
                </>
              )}
            </Grid>
            {hasStackTraces && (
              <Grid item xs={8} className={classes.overflow}>
                <Typography>Stacktraces:</Typography>
                {job.stacktrace.map((stack, id) => ( // eslint-disable-next-line react/no-array-index-key
                  <CodeBlock key={id} component='pre'>
                    {job.stacktrace.join('\n')}
                  </CodeBlock>
                ))}
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Collapse>
      {job.progress > 0 && (
        <LinearProgress variant='determinate' value={job.progress} />
      )}
    </Card>
  )
})

export default withStyles(styles)(Job)
