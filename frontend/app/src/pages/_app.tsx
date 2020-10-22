import ApolloClient       from 'apollo-client'
import NextApp            from 'next/app'
import React              from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache }  from 'apollo-cache-inmemory'
import { ThemeProvider }  from 'emotion-theming'
import { IntlProvider }   from 'react-intl'
import { createHttpLink } from 'apollo-link-http'

import { theme }          from '@ui/theme'

import { Seo }            from '../Seo'

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/',
})

const client: any = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <IntlProvider locale='ru' defaultLocale='ru'>
          <ThemeProvider theme={theme}>
            <Seo />
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </IntlProvider>
      </>
    )
  }
}
