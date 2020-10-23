import styled         from '@emotion/styled'
import { background } from 'styled-system'

import { theme }      from '@ui/theme'

export const Input = styled('input')(
  () => ({
    height: '45px',
    width: '100%',
    outline: 'none',
    overflow: 'hidden',
    boxSizing: 'border-box',
    paddingLeft: '50px',
    border: theme.borders.gray,
    borderRadius: theme.radii.small,
    fontFamily: theme.fonts.text,
    fontSize: theme.fontSizes.default,
    color: theme.colors.semiBlack,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '13% 75%',
    backgroundPosition: 'left center',
    '::placeholder': {
      color: theme.colors.gray,
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0px 10em ${theme.colors.white} inset !important`,
      WebkitTextFillColor: `${theme.colors.semiBlack} !important`,
      caretColor: theme.colors.semiBlack,
    },
  }),
  background
)
