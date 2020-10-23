import styled                    from '@emotion/styled'
import { theme }                 from '@ui/theme/src'
import { border, color, layout } from 'styled-system'

interface ButtonProp {
  shadow?: boolean
}

export const Button: any = styled.div(
  ({ shadow }: ButtonProp) => ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      boxShadow: shadow ? theme.shadows.default : null,
    },
  }),
  color,
  border,
  layout
)
