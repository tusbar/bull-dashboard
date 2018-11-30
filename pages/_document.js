import 'isomorphic-unfetch' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import PropTypes from 'prop-types'
import Document, {Head, Main, NextScript} from 'next/document'

export default class extends Document {
  static getInitialProps = ctx => {
    let pageContext

    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext

        return (
          <Component {...props} />
        )
      }

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      }

      return WrappedComponent
    })

    return {
      ...page,
      pageContext,
      styles: (
        <style
          id='jss-server-side'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: pageContext.sheetsRegistry.toString()}}
        />
      )
    }
  }

  render() {
    const {pageContext} = this.props

    return (
      <html lang='en' dir='ltr'>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <meta name='theme-color' content={pageContext.theme.palette.primary.main} />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
