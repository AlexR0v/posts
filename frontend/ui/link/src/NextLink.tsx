import Link                          from 'next/link'
import styled                        from '@emotion/styled'
import React, { FC, useState }       from 'react'
import { color, layout, typography } from 'styled-system'
import { ifProp }                    from 'styled-tools'

import { Text }                      from '@ui/text'

export const LinkStyled = styled(Text.withComponent('a'))<any>(
  () => ({
    position: 'relative',
    textDecoration: 'none',
    display: 'inline-flex',
    transition: '0.35s',
    cursor: 'pointer',
    '::after': {
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
      transition: '0.35s',
    },
  }),
  ifProp('underline', ({ theme, underlineColor }) => ({
    position: 'relative',
    '::after': {
      transition: '0.35s',
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors[underlineColor] || theme.colors.white,
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
    },
  })),
  ifProp('active', ({ theme, activeColor }) => ({
    position: 'relative',
    '::after': {
      transition: '0.35s',
      content: '""',
      height: '1px',
      width: '100%',
      backgroundColor: theme.colors[activeColor] || theme.colors.white,
      position: 'absolute',
      bottom: '-3px',
      left: '0px',
    },
  })),
  layout,
  color,
  typography
)

interface NextLinkProps {
  active?: boolean
  path?: string
  underlineColor?: string
  underline?: any
  clickedColor?: string
  href?: string
  color?: string
  children?: any
  fontFamily?: string | string[]
  activeColor?: string
}

export const NextLink: FC<NextLinkProps> = ({
  active,
  path,
  underlineColor,
  underline,
  clickedColor,
  href,
  children,
  ...props
}: NextLinkProps) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  return (
    <Link href={{ pathname: href }}>
      <LinkStyled
        active={active}
        underlineColor={underlineColor}
        underline={underline && hovered && !clicked}
        onMouseOver={() => setHovered(true)}
        onFocus={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setClicked(false)
        }}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        {...props}
      >
        {children}
      </LinkStyled>
    </Link>
  )
}

NextLink.defaultProps = {
  fontFamily: 'text',
}
