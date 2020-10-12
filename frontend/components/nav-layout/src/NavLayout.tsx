import React        from 'react'

import { NextLink } from '../../../ui/link/src'

const NavLayout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <NextLink href='/'>World</NextLink>
        </nav>
      </header>
      {children}
    </>
  )
}

export default NavLayout
