import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  homeLink: {
    id: `${scope}.homeLink`,
    defaultMessage: 'Home',
  },
  loginLink: {
    id: `${scope}.loginLink`,
    defaultMessage: 'Login',
  },
  registerLink: {
    id: `${scope}.registerLink`,
    defaultMessage: 'Register',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
})
