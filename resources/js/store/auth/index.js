import axios from 'axios'
import { useDebugState as useState } from 'use-named-state'

export const useAuth = () => {
  const checkAuth = async () => {
    try {
      await axios.get('/api/v1/ping')
      return true
    } catch(e) {
      console.error('Auth error:', e)
      return false
    }
  }

  const login = async ({ email, password }) => {
    await axios.post('/api/v1/login', { email, password })
    setIsLoggedIn(true)
    return
  }

  const register = async ({ email, password, passwordConfirm, username }) => {
    await axios.post('/api/v1/register', { email, password, password_confirmation: passwordConfirm, username })
    setIsLoggedIn(true)
    return
  }

  return {
    state: {

    },
    checkAuth,
    login,
    register
  }
}
