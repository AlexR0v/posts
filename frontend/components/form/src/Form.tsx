import * as React                          from 'react'
import { useContext, useEffect, useState } from 'react'
import { injectIntl }                      from 'react-intl'

import { AuthContext }                     from '@store/context'
import { Button }                          from '@ui/button'
import { Input }                           from '@ui/input'
import { Box, Column, Layout }             from '@ui/layout'
import { Text }                            from '@ui/text'

import messages                            from './messages'
import { useData }                         from './useData'
import { useStateCallbackWrapper }         from './utils'

const Form = ({ intl, path }) => {
  const { user } = useContext(AuthContext)

  const [body, setBody] = useState('')
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
      setSuccess(intl.formatMessage(messages.validPasswordTrue))
    }
  })
  const [isValidName, setIsValidName] = useStateCallbackWrapper(false, () => {
    if (isValidName) {
      setIsSubmit(true)
      setSuccess('Отличное имя!:)')
    }
  })

  const handleFormChange = (event) => {
    if (event.target.name === 'body') {
      setBody(event.target.value)
    }

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
        setSuccess(intl.formatMessage(messages.passwordErrorUp))
      }
      if (!/(?=.*[A-Z])/.test(event.target.value)) {
        setSuccess(intl.formatMessage(messages.passwordErrorDown))
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
        setSuccess(intl.formatMessage(messages.unValidEmail))
      }
      setEmail(event.target.value)
    }
    if (event.target.name === 'name') {
      setIsValidName(/(^[A-Z]{1}[a-z]{1,14})|(^[А-Я]{1}[а-я]{1,14})/.test(event.target.value))
      if (!/(^[A-Z]{1}[a-z]{1,14})|(^[А-Я]{1}[а-я]{1,14})/.test(event.target.value)) {
        setSuccess(intl.formatMessage(messages.validName))
      }
      setName(event.target.value)
    }
  }

  const { addUser, loginUser, setErrors, errors, addPost, errorsPost, setErrorsPost } = useData({
    name,
    email,
    password,
    rePassword,
    body,
  })

  const handleForm = () => {
    setName('')
    setPassword('')
    setRePassword('')
    setEmail('')
    setBody('')

    if (path === '/login') {
      if (name && password && isValidName && isValidPass) {
        setIsSubmit(true)
        loginUser()
      } else {
        setSuccess(`${intl.formatMessage(messages.declined)}`)
      }
    }
    if (path === '/register') {
      if (name && password && email && isValidName && isValidPass && isValidEmail && isPassword) {
        setIsSubmit(true)
        addUser()
      } else {
        setSuccess(`${intl.formatMessage(messages.declined)}`)
      }
    }
    if (path === '/') {
      addPost()
    }
  }

  useEffect(() => {
    if (path === '/register') {
      if (password === rePassword) {
        setIsPassword(true)
        setSuccessPass('')
      } else {
        setSuccessPass('Пароли не совпадают!')
        setIsPassword(false)
      }
    }
  }, [password, rePassword, isValidPass, name, email, isValidEmail])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleForm()
    }
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSuccess('')
      setSuccessPass('')
      setIsSubmit(false)
      setErrorsPost('')
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [success, setSuccess, setSuccessPass, errorsPost])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrors({})
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [errors, setErrors])

  return (
    <Box width={340}>
      <Column onKeyPress={handleKeyPress}>
        <Text fontSize='default' color={isSubmit ? 'blue' : 'red'}>
          {success}
        </Text>
        {Object.values(errors).map((value) => (
          <Text key={value} fontSize='default' color='red'>
            {value}
          </Text>
        ))}
        {user && (
          <Text fontSize='default' color='red'>
            {errorsPost}
          </Text>
        )}
        <Text fontSize='default' color={isSubmit ? 'blue' : 'red'}>
          {successPass}
        </Text>
        {path === '/login' || user ? null : (
          <>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={handleFormChange}
              placeholder={intl.formatMessage(messages.email)}
            />
            <Layout flexBasis={20} />
          </>
        )}
        {!user && (
          <Input
            type='text'
            value={name}
            name='name'
            onChange={handleFormChange}
            placeholder={intl.formatMessage(messages.name)}
          />
        )}
        {user && (
          <Input
            type='text'
            value={body}
            name='body'
            onChange={handleFormChange}
            placeholder={intl.formatMessage(messages.body)}
          />
        )}
        <Layout flexBasis={20} />
        {!user && (
          <Input
            type='password'
            name='password'
            value={password}
            onChange={handleFormChange}
            placeholder={intl.formatMessage(messages.password)}
          />
        )}
        <Layout flexBasis={20} />
        {path === '/login' || user ? null : (
          <Input
            type='password'
            name='rePassword'
            value={rePassword}
            onChange={handleFormChange}
            placeholder={intl.formatMessage(messages.passwordRepeat)}
          />
        )}

        <Layout flexBasis={16} />
        <Button shadow={true} height={50} borderRadius='medium' bg='blue' onClick={handleForm}>
          <Text color='white' fontSize='default'>
            {path === '/login'
              ? intl.formatMessage(messages.buttonLogin)
              : user
              ? intl.formatMessage(messages.buttonAdd)
              : intl.formatMessage(messages.button)}
          </Text>
        </Button>
      </Column>
    </Box>
  )
}

export default injectIntl(Form)
