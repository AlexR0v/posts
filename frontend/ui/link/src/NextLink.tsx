import Link                          from 'next/link'
import styled                        from '@emotion/styled'
import React, { useState }           from 'react'
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

export const NextLink: any = ({
  active,
  path,
  underlineColor,
  underline,
  hoverColor,
  clickedColor,
  href,
  children,
  ...props
}) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  return (
    <Link href={{ pathname: href }}>
      <LinkStyled
        active={active}
        /* eslint-disable no-nested-ternary */
        color={clicked ? clickedColor || color : hovered ? hoverColor || color : color}
        underlineColor={underlineColor}
        underline={underline && hovered && ((!clicked && clickedColor) || !clickedColor)}
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
