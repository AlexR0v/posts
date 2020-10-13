import React                from 'react'
import { Box, Column, Row } from '@atlantis-lab/layout'
import { useRouter }        from 'next/router'
import { injectIntl }       from 'react-intl'

import { NextLink }         from '@ui/link'
import { Text }             from '@ui/text'

import messages             from './messages'

const NavLayout = ({ children, intl }) => {
  const router = useRouter()
  return (
    <>
      <Column as='header' alignItems='center'>
        <Box height={['40px', '50px', '70px']} width={['375px', '768px', '1440px']} bg='blue'>
          <Row as='nav' alignItems='center' justifyContent='space-evenly'>
            <NextLink
              underline
              color='white'
              href='/'
              active={router.pathname === '/'}
              activeColor='clickedColor'
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
              activeColor='clickedColor'
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
              activeColor='clickedColor'
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
      {children}
    </>
  )
}

export default injectIntl(NavLayout)
