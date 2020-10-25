import jwtDecode                            from 'jwt-decode'
import React, { createContext, useReducer } from 'react'
import { CookieStorage }                    from 'cookie-storage'

const date = new Date()
date.setDate(date.getDate() + 30)
export const cookieStorage = new CookieStorage({
  path: '/',
  expires: date,
  sameSite: 'Strict',
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
})

const AuthProvider = (props) => {
  const initialState = {
    user: null,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  const token = cookieStorage.getItem('jwtToken') || ''
  if (token) {
    const decodeToken = jwtDecode(cookieStorage.getItem('jwtToken'))
    initialState.user = decodeToken
    if (decodeToken.exp * 1000 < Date.now()) {
      cookieStorage.removeItem('jwtToken')
    }
  }

  function login(userData) {
    cookieStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  function logout() {
    cookieStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
