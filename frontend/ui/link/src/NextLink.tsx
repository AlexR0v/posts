import Link                  from 'next/link'
import React                 from 'react'
import styled                from '@emotion/styled'
import { color, typography } from 'styled-system'

import { Text }              from '@ui/text'

const LinkStyled: any = styled(Text.withComponent('a'))(
  {
    cursor: 'pointer',
    textDecoration: 'underline',
    ':hover': {
      textDecoration: 'none',
    },
  },
  typography,
  color
)

export const NextLink = ({ href, children, ...props }) => (
  <Link href={{ pathname: href }}>
    <LinkStyled {...props}>{children}</LinkStyled>
  </Link>
)

NextLink.defaultProps = {
  fontFamily: 'text',
}
