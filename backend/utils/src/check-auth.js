const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('@merng/app/config')

module.exports.checkAuth = (context) => {

  const authHeader = context.req.headers.authorization
  if (authHeader) {

    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY)
        return user
      } catch (err) {
        throw new AuthenticationError('Невалидный/истекший токен')
      }
    }
    throw new Error('Ошибка авторизации')
  }
  throw new Error('Необходимо зарегистрироваться')
}
