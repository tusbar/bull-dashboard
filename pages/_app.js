import React from 'react'
import App, {Container} from 'next/app'
import getConfig from 'next/config'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'

import getPageContext from '../lib/mui-page-context'

import Layout from '../components/layout'

const {publicRuntimeConfig: {
  API_URL
}} = getConfig()

const fetchQueues = async () => {
  const res = await fetch(`${API_URL}/queues`)
  return res.json()
}

export default class extends App {
  pageContext = getPageContext()

  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const queues = await fetchQueues()

    return {
      pageProps,
      queues,
      query: ctx.query
    }
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const {Component, queues, query, pageProps} = this.props
    const {sheetsRegistry, sheetsManager, generateClassName, theme} = this.pageContext

    return (
      <Container>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <CssBaseline />

            <Layout queues={queues} query={query}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}
