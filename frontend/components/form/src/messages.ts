import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Ваше имя',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Пароль',
  },
  passwordRepeat: {
    id: `${scope}.passwordRepeat`,
    defaultMessage: 'Повторите пароль',
  },
  button: {
    id: `${scope}.button`,
    defaultMessage: 'Зарегистрироваться',
  },
  buttonLogin: {
    id: `${scope}.buttonLogin`,
    defaultMessage: 'Войти',
  },
  linkAuth: {
    id: `${scope}.linkAuth`,
    defaultMessage: 'Войти в аккаунт',
  },
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Спасибо! Мы скоро с вами свяжемся!',
  },
  declined: {
    id: `${scope}.declined`,
    defaultMessage: 'Необходимо заполнить все поля формы!',
  },
  declinedPassword: {
    id: `${scope}.declinedPassword`,
    defaultMessage: 'Пароли не совпадают!',
  },
  unValidEmail: {
    id: `${scope}.unValidEmail`,
    defaultMessage: 'Е-mail не верный!',
  },
  validEmail: {
    id: `${scope}.validEmail`,
    defaultMessage: 'Е-mail верный!',
  },
  validName: {
    id: `${scope}.validName`,
    defaultMessage: 'Имя не верное!',
  },
  validPassword: {
    id: `${scope}.validPassword`,
    defaultMessage: 'Пароли совпадают!',
  },
  validPasswordTrue: {
    id: `${scope}.validPassword`,
    defaultMessage: 'Пароли совпадают!',
  },
  passwordErrorUp: {
    id: `${scope}.passwordErrorUp`,
    defaultMessage: 'Пароль должен содержать латнские буквы в нижнем регистре!',
  },
  passwordErrorDown: {
    id: `${scope}.passwordErrorDown`,
    defaultMessage: 'Пароль должен содержать латнские буквы в верхнем регистре!',
  },
})
