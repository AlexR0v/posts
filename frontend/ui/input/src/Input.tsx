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
    border: theme.border.s,
    borderRadius: theme.borderRadius.s,
    fontFamily: theme.fontFamily.text,
    fontSize: theme.fontSize.xs,
    color: theme.colors.greyDark,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '13% 75%',
    backgroundPosition: 'left center',
    '::placeholder': {
      color: theme.colors.lightGrey,
    },
  }),
  background
)
