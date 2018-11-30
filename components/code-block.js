import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'

const styles = () => ({
  background: {
    padding: '4px 8px',
    marginBottom: 4,
    backgroundColor: grey[800],
    color: grey[100],
    overflow: 'auto'
  }
})

const CodeBlock = ({classes, children}) => {
  return (
    <Typography component='pre' className={classes.background}>
      <code>{children}</code>
    </Typography>
  )
}

export default withStyles(styles)(CodeBlock)
