import axios from 'axios'
import { useDebugState as useState } from 'use-named-state'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState('isLoggedIn', false)

  const checkAuth = async () => {
    try {
      await axios.get('/api/v1/ping')
      setIsLoggedIn(true)
    } catch(e) {
      console.error('Auth error:', e)
      setIsLoggedIn(false)
    }
  }

  const login = async ({ email, password }) => {
    await axios.post('/api/v1/login', { email, password })
    setIsLoggedIn(true)
    return
  }

  const register = async ({ email, password, confirmPassword, username }) => {
    await axios.post('/api/v1/register', { email, password, password_confirmation: confirmPassword, username })
    setIsLoggedIn(true)
    return
  }

  return {
    state: {
      isLoggedIn,
    },
    checkAuth,
    login,
    register
  }
}
