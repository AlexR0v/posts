const { User } = require('@merng/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateRegisterInput, validateLoginInput } = require('@merng/utils')
const { SECRET_KEY } = require('@merng/app/config')
const { UserInputError } = require('apollo-server')

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError('Ошибки аутентификации', { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'Пользователь не найден'
        throw new UserInputError('Ошибки идентификации', { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Паротль не подходит'
        throw new UserInputError('Ошибки идентификации', { errors })
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Ошибки валидации', { errors })
      }

      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Пользователь с таким именем существует', {
          errors: {
            username: 'Пользователь с таким именем существует',
          },
        })
      }
      const emailUser = await User.findOne({ email })
      if (emailUser) {
        throw new UserInputError('Пользователь с такой почтой существует', {
          errors: {
            username: 'Пользователь с такой почтой существует',
          },
        })
      }

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
