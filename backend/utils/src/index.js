const { validateRegisterInput } = require('./validators')
const { validateLoginInput } = require('./validators')
const { checkAuth } = require('./check-auth')

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  checkAuth
}
