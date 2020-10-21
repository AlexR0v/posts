import styled                                              from '@emotion/styled'
import { color, flexbox, layout, position, space, system } from 'styled-system'

const boxSizing = system({
  boxSizing: true,
})

export const Column: any = styled.div(layout, space, flexbox, position, boxSizing)

Column.defaultProps = {
  width: '100%',
  flexDirection: 'column',
  display: 'flex',
}

export const Row: any = styled.div(layout, space, flexbox, position, boxSizing)

Row.defaultProps = {
  width: '100%',
  flexDirection: 'row',
  display: 'flex',
}

export const Layout: any = styled.div(layout, space, flexbox, position, color, boxSizing)

Layout.defaultProps = {
  display: 'flex',
}
