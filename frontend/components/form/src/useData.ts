import gql                      from 'graphql-tag'
import { useMutation }          from '@apollo/react-hooks'
import { useRouter }            from 'next/router'
import { useContext, useState } from 'react'

import { AuthContext }          from '@store/context'
import { query }                  from '@site/index-page'

const REGISTER_USER: any = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`
const LOGIN_USER: any = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export const useData = ({ name, email, password, rePassword, body }) => {
  const router = useRouter()
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const [errorsPost, setErrorsPost] = useState('')
  const [addUser] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData)
      router.push('/')
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: {
      username: name,
      email: email,
      password: password,
      confirmPassword: rePassword,
    },
  })
  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData)
      router.push('/')
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors)
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: {
      username: name,
      password: password,
    },
  })
  const [addPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: query,
      })
      data.getPosts = [result.data.createPost, ...data.getPosts]
      proxy.writeQuery({
        query: query,
        data,
      })
    },
    onError(err) {
      setErrorsPost(err.graphQLErrors[0].message)
    },
    variables: {
      body: body,
    },
  })

  return { loginUser, addUser, setErrors, errors, addPost, errorsPost, setErrorsPost }
}
