import React, { useContext } from 'react'
import { useRouter }         from 'next/router'
import { injectIntl }        from 'react-intl'

import { AuthContext }       from '@store/context'
import { Button }            from '@ui/button'
import { Box, Column, Row }  from '@ui/layout'
import { NextLink }          from '@ui/link'
import { Text }              from '@ui/text'

import messages              from './messages'

const NavLayout = ({ children, intl }) => {
  const { user, logout } = useContext(AuthContext)
  const router = useRouter()
  if (user && router.pathname === '/login') {
    router.push('/')
  }
  return (
    <>
      <Box bg='blue'>
        <Column as='header' alignItems='center'>
          <Box height={[40, 50, 70]} maxWidth={[375, 768, 1440]} width='100%'>
            <Row alignItems='center' justifyContent='space-evenly'>
              <NextLink
                underline
                color='white'
                href='/'
                active={router.pathname === '/'}
                activeColor='activeLink'
              >
                <Text
                  textTransform='uppercase'
                  color='white'
                  fontSize={['semiMedium', 'default', 'xlMedium']}
                >
                  {intl.formatMessage(messages.homeLink)}
                </Text>
              </NextLink>

              {user ? (
                <NextLink
                  underline
                  color='white'
                  href='/'
                  active={router.pathname === '/login'}
                  activeColor='activeLink'
                >
                  <Text
                    textTransform='uppercase'
                    color='white'
                    fontSize={['semiMedium', 'default', 'xlMedium']}
                  >
                    {user.username}
                  </Text>
                </NextLink>
              ) : (
                <NextLink
                  underline
                  color='white'
                  href='/login'
                  active={router.pathname === '/login'}
                  activeColor='activeLink'
                >
                  <Text
                    textTransform='uppercase'
                    color='white'
                    fontSize={['semiMedium', 'default', 'xlMedium']}
                  >
                    {intl.formatMessage(messages.loginLink)}
                  </Text>
                </NextLink>
              )}

              {user ? (
                <Button onClick={logout}>
                  <Text
                    textTransform='uppercase'
                    color='white'
                    fontSize={['semiMedium', 'default', 'xlMedium']}
                  >
                    {intl.formatMessage(messages.logout)}
                  </Text>
                </Button>
              ) : (
                <NextLink
                  underline
                  color='white'
                  href='/register'
                  active={router.pathname === '/register'}
                  activeColor='activeLink'
                >
                  <Text
                    textTransform='uppercase'
                    color='white'
                    fontSize={['semiMedium', 'default', 'xlMedium']}
                  >
                    {intl.formatMessage(messages.registerLink)}
                  </Text>
                </NextLink>
              )}
            </Row>
          </Box>
        </Column>
      </Box>
      {children}
    </>
  )
}

export default injectIntl(NavLayout)
