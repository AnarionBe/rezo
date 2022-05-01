import { useEffect } from 'react'
import { useDebugState as useState } from 'use-named-state'

export const useAuth = ({ axios }) => {
  const [currentUser, setCurrentUser] = useState('currentUser', {})

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if(currentUser !== {}) {
      window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
    }
  }, [currentUser])

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/ping')
      setCurrentUser(data)
      return true
    } catch(e) {
      console.error('Auth error:', e)
      return false
    }
  }

  const login = async ({ email, password }) => {
    const { data } = await axios.post('/login', { email, password })
    setCurrentUser(data)
    return
  }

  const register = async ({ email, password, passwordConfirm, username }) => {
    const { data } = await axios.post('/register', { email, password, password_confirmation: passwordConfirm, username })
    setCurrentUser(data)
    return
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
      currentUser
    },
    checkAuth,
    login,
    register,
    linkWallet
  }
}
