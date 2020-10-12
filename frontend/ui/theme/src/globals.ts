import { injectGlobal } from 'emotion'

export const globalStyle = injectGlobal({
  html: {
    height: '100%',
  },
  body: {
    WebkitFontSmoothing: 'antialiased',
    WebkitOverflowScrolling: 'touch',
    margin: 0,
    height: '100%',
    overflowX: 'hidden',
  },
  '#__next': {
    display: 'flex',
    minHeight: '100%',
    overflowX: 'hidden',
    flexDirection: 'column',
  },
  h1: {
    margin: 0,
  },
  h2: {
    margin: 0,
  },
  '*': {
    boxSizing: 'border-box',
  },
})
