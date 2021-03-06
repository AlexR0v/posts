import React              from 'react'
import { useRouter }      from 'next/router'
import { useIntl }        from 'react-intl'

import { Form }           from '@components/form'
import { NavLayout }      from '@components/nav-layout'
import { Column, Layout } from '@ui/layout'
import { Text }           from '@ui/text'

import messages           from './messages'

export const LoginPage = () => {
  const router = useRouter()
  const intl = useIntl()
  return (
    <NavLayout>
      <Column alignItems='center'>
        <Layout flexBasis={[20, 30, 50]} />
        <Text as='h1' fontSize={['xmedium', 'semiLarge', 'large']}>
          {intl.formatMessage(messages.title)}
        </Text>
        <Layout flexBasis={[20, 30, 50]} />
        <Form path={router.pathname} />
      </Column>
    </NavLayout>
  )
}
