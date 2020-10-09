module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Имя пользователя не может быть пустым'
  }
  if (email.trim() === '') {
    errors.email = 'Email не может быть пустым'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email не верно'
    }
  }
  if (password === '') {
    errors.password = 'Пароль не может быть пустым'
  } else if (password !== confirmPassword) {
    errors.password = 'Пароли не совпадают'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Имя пользователя не может быть пустым'
  }
  if (password === '') {
    errors.password = 'Пароль не может быть пустым'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
