import { useEffect } from 'react'
import { useDebugState as useState } from 'use-named-state'

export const useAuth = ({ axios }) => {
  const [currentUser, setCurrentUser] = useState('currentUser', {})
  const [isAuthenticated, setIsAuthenticated] = useState('isAuthenticated', false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/ping')
      setCurrentUser(data)
      setIsAuthenticated(true)
      return true
    } catch(e) {
      console.error('Auth error:', e)
      setIsAuthenticated(false)
      return false
    }
  }

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/login', { email, password })
      setCurrentUser(data)
      setIsAuthenticated(true)
      return data
    } catch(e) {
      console.error('Auth error:', e)
      setIsAuthenticated(false)
      return false
    }
  }

  const register = async ({ email, password, passwordConfirm, username }) => {
    try {
      const { data } = await axios.post('/register', { email, password, password_confirmation: passwordConfirm, username })
      setCurrentUser(data)
      setIsAuthenticated(true)
      return data

    } catch(e) {
      console.error('Auth error:', e)
      setIsAuthenticated(false)
      return false
    }
  }

  const linkWallet = async wallet => {
    try {
      const { data } = await axios.post('/users/link-wallet', { wallet })
      setCurrentUser(data)
      return data
    } catch(e) {
      return e
    }
  }

  return {
    state: {
      currentUser,
      isAuthenticated
    },
    checkAuth,
    login,
    register,
    linkWallet
  }
}
