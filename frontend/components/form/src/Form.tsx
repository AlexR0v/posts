import * as React                            from 'react'
import { useEffect, useState }               from 'react'
import { injectIntl }                        from 'react-intl'

import { Button }                            from '@ui/button'
import { EmailIcon, NameIcon, PasswordIcon } from '@ui/icons'
import { Input }                             from '@ui/input'
import { Box, Column, Layout }               from '@ui/layout'
import { Text }                              from '@ui/text'
import { theme }                             from '@ui/theme'

import messages                              from './messages'

const useStateCallbackWrapper = (initialValue, callBack) => {
  const [state, setState] = useState(initialValue)
  useEffect(() => callBack(state), [state])
  return [state, setState]
}

const Form = ({ intl, isSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [password, setPassword] = useState('')
  const [isPassword, setIsPassword] = useState(false)
  const [successPass, setSuccessPass] = useState('')

  const [isValidEmail, setIsValidEmail] = useStateCallbackWrapper(false, () => {
    if (isValidEmail) {
      setIsSubmit(true)
      setSuccess(`${intl.formatMessage(messages.validEmail)}`)
    }
  })
  const [isValidPass, setIsValidPass] = useStateCallbackWrapper(false, () => {
    if (isValidPass) {
      setIsSubmit(true)
      setSuccess('Подходящий пароль!')
    }
  })
  const [isValidName, setIsValidName] = useStateCallbackWrapper(false, () => {
    if (isValidName) {
      setIsSubmit(true)
      setSuccess('Отличное имя!:)')
    }
  })

  const handleForm = () => {
    setName('')
    setPassword('')
    setRePassword('')
    setEmail('')

    if (name && password && email && isValidName && isValidPass && isValidEmail && isPassword) {
      setSuccess(`${intl.formatMessage(messages.success)}`)
      setIsSubmit(true)
      isSuccess(true)
      alert(`Имя: ${name}, пароль: ${password}, email: ${email}`) // eslint-disable-line
    } else {
      setSuccess(`${intl.formatMessage(messages.declined)}`)
    }
  }

  const handleFormChange = event => {
    if (event.target.name === 'password') {
      setPassword(event.target.value)

      setIsValidPass(
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
          event.target.value
        )
      )

      if (!/[0-9a-zA-Z!@#$%^&*]{6,}/.test(event.target.value)) {
        setSuccess('Пароль слишком короткий!')
      }
      if (!/(?=.*[a-z])/.test(event.target.value) && !/(?=.*[A-Z])/.test(event.target.value)) {
        setSuccess('Пароль должен содержать латнские буквы в нижнем регистре!')
      }
      if (!/(?=.*[A-Z])/.test(event.target.value)) {
        setSuccess('Пароль должен содержать латнские буквы в верхнем регистре!')
      }

      if (!/(?=.*[!@#$%^&*])/.test(event.target.value)) {
        setSuccess('Пароль должен содержать спецсимволы ! @ # $ % ^ & *')
      }

      if (!/(?=.*[0-9])/.test(event.target.value)) {
        setSuccess('Пароль должен иметь число!')
      }
    }

    if (event.target.name === 'rePassword') {
      setRePassword(event.target.value)
    }
    if (event.target.name === 'email') {
      setIsValidEmail(
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          event.target.value
        )
      )
      if (
        !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
          event.target.value
        )
      ) {
        setSuccess('E-mail не валидный!')
      }
      setEmail(event.target.value)
    }
    if (event.target.name === 'name') {
      setIsValidName(/(^[A-Z]{1}[a-z]{1,14})|(^[А-Я]{1}[а-я]{1,14})/.test(event.target.value))
      if (!/(^[A-Z]{1}[a-z]{1,14})|(^[А-Я]{1}[а-я]{1,14})/.test(event.target.value)) {
        setSuccess('Имя не подходит!')
      }
      setName(event.target.value)
    }
  }

  useEffect(() => {
    if (password === rePassword) {
      setIsPassword(true)
      setSuccessPass('')
    } else {
      setSuccessPass('Пароли не совпадают!')
      setIsPassword(false)
    }
  }, [password, rePassword, isValidPass, name, email, isValidEmail])

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleForm()
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSuccess('')
      setSuccessPass('')
      setIsSubmit(false)
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [success, setSuccess, setSuccessPass])

  return (
    <Box width={340}>
      <Column onKeyPress={handleKeyPress}>
        <Text
          fontSize={theme.fontSize.xs}
          color={isSubmit ? theme.colors.lightBlue : theme.colors.error}
          fontFamily={theme.fontFamily.text}
        >
          {success}
        </Text>
        <Text
          fontSize={theme.fontSize.xs}
          color={isSubmit ? theme.colors.lightBlue : theme.colors.error}
          fontFamily={theme.fontFamily.text}
        >
          {successPass}
        </Text>
        <Input
          type='email'
          name='email'
          value={email}
          onChange={handleFormChange}
          backgroundImage={`url(${EmailIcon})`}
          backgroundSize='8% 62%'
          backgroundPosition='5px center'
          placeholder={intl.formatMessage(messages.email)}
        />
        <Layout flexBasis={20} />
        <Input
          type='text'
          value={name}
          name='name'
          onChange={handleFormChange}
          backgroundImage={`url(${NameIcon})`}
          placeholder={intl.formatMessage(messages.name)}
        />
        <Layout flexBasis={20} />
        <Input
          type='password'
          name='password'
          value={password}
          onChange={handleFormChange}
          backgroundImage={`url(${PasswordIcon})`}
          backgroundSize='8% 62%'
          backgroundPosition='5px center'
          placeholder={intl.formatMessage(messages.password)}
        />
        <Layout flexBasis={20} />
        <Input
          type='password'
          name='rePassword'
          value={rePassword}
          onChange={handleFormChange}
          backgroundImage={`url(${PasswordIcon})`}
          backgroundSize='8% 62%'
          backgroundPosition='5px center'
          placeholder={intl.formatMessage(messages.passwordRepeat)}
        />
        <Layout flexBasis={54} />
        <Button onClick={handleForm}>
          <Text
            color={theme.colors.white}
            fontSize={theme.fontSize.xs}
            fontFamily={theme.fontFamily.text}
          >
            {intl.formatMessage(messages.button)}
          </Text>
        </Button>
      </Column>
    </Box>
  )
}

export default injectIntl(Form)
