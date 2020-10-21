import React         from 'react'

import { NavLayout } from '@components/nav-layout'
import { Column }    from '@ui/layout'
import { Text }      from '@ui/text'

export const LoginPage = () => {
  return (
    <NavLayout>
      <Column alignItems='center'>
        <Text as='h1' fontSize={['xmedium', 'semiLarge', 'large']}>
          Login Page
        </Text>
      </Column>
    </NavLayout>
  )
}
