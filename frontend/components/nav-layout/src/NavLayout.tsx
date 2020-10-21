import React                from 'react'
import { useRouter }        from 'next/router'
import { injectIntl }       from 'react-intl'

import { Box, Column, Row } from '@ui/layout'
import { NextLink }         from '@ui/link'
import { Text }             from '@ui/text'

import messages             from './messages'

const NavLayout = ({ children, intl }) => {
  const router = useRouter()
  return (
    <>
      <Box bg='blue'>
        <Column as='header' alignItems='center'>
          <Box height={[40, 50, 70]} maxWidth={[375, 768, 1440]} width='100%'>
            <Row as='nav' alignItems='center' justifyContent='space-evenly'>
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
            </Row>
          </Box>
        </Column>
      </Box>
      {children}
    </>
  )
}

export default injectIntl(NavLayout)
