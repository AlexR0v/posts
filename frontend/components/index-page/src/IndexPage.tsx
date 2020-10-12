import React         from 'react'

import { NavLayout } from '@components/nav-layout'

import { Text }      from '../../../ui/text'

export const IndexPage = () => {
  return (
    <NavLayout>
      <Text as='h1' fontSize={['xmedium', 'semiLarge', 'large']} color='someColor'>
        Hello
      </Text>
    </NavLayout>
  )
}
