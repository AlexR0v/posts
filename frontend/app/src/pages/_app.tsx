import ApolloClient       from 'apollo-client'
import NextApp            from 'next/app'
import React              from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache }  from 'apollo-cache-inmemory'
import { ThemeProvider }  from 'emotion-theming'
import { IntlProvider }   from 'react-intl'
import { setContext }       from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

import { AuthProvider }   from '@store/context'
import { cookieStorage }  from '@store/context'
import { theme }          from '@ui/theme'

import { Seo }            from '../Seo'

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/',
})

const authLink = setContext(() => {
  const token = cookieStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client: any = new ApolloClient({
  link: authLink.concat(httpLink),
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
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </ApolloProvider>
          </ThemeProvider>
        </IntlProvider>
      </>
    )
  }
}
