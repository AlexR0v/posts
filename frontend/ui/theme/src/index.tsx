import * as theme          from './theme'
import { fontFaces }       from './theme'
import { injectFontFaces } from './utils'

export * from './Provider'
export * from './globals'
injectFontFaces(fontFaces)

export { theme }
