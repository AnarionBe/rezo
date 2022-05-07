import { useEffect, useReducer, useState } from 'react'
import reducer from './reducer'
import actions from './actions'
import { useErrors } from 'helpers/use-errors'

const initialState = {
  currentUser: null,
  isAuthenticated: false
}

export const useUser = ({ axios, navigate }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const Errors = useErrors()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/ping')
      dispatch({ type: actions.LOGIN, payload: { user: data } })
    } catch(e) {
      dispatch({ type: actions.LOGOUT })
    } finally {
      setIsLoading(false)
    }
  }

  const login = async ({ email, password }) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/login', { email, password })
      dispatch({ type: actions.LOGIN, payload: { user: data } })
      navigate('/')
    } catch(e) {
      Errors.set(e)
      dispatch({ type: actions.LOGOUT })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({ email, password, passwordConfirm, username }) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/register', { email, password, password_confirmation: passwordConfirm, username })
      dispatch({ type: actions.LOGIN, payload: { user: data } })
      navigate('/')
    } catch(e) {
      Errors.set(e)
      dispatch({ type: actions.LOGOUT })
    } finally {
      setIsLoading(false)
    }
  }

  const linkWallet = async wallet => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/users/link-wallet', { wallet })
      dispatch({ type: actions.LOGIN, payload: { user: data } })
    } catch(e) {
      dispatch({ type: actions.LOGOUT })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    state: {
      ...state,
      isLoading
    },
    Errors,
    checkAuth,
    login,
    register,
    linkWallet
  }
}
