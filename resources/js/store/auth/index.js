import axios from 'axios'

export const useAuth = () => {
  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/v1/ping')
      sessionStorage.setItem('currentUser', JSON.stringify(data))
      return true
    } catch(e) {
      console.error('Auth error:', e)
      return false
    }
  }

  const login = async ({ email, password }) => {
    const { data } = await axios.post('/api/v1/login', { email, password })
    sessionStorage.setItem('currentUser', JSON.stringify(data))
    return
  }

  const register = async ({ email, password, passwordConfirm, username }) => {
    const { data } = await axios.post('/api/v1/register', { email, password, password_confirmation: passwordConfirm, username })
    sessionStorage.setItem('currentUser', JSON.stringify(data))
    return
  }

  const currentUser = (() => {
    const user = sessionStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  })()

  return {
    state: {
      currentUser
    },
    checkAuth,
    login,
    register
  }
}
