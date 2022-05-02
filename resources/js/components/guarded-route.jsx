import { useEffect } from 'react'
import { basil } from '@spices/basil'
import { useNavigate } from 'react-router-dom'
import { useNamedState as useState } from 'use-named-state'

export const GuardedRoute = ({ children, userStore }) => {
  const { auth = false, name = 'register'} = basil.get(children, 'props.children.props', {})
  const navigate = useNavigate()
  const [status, setStatus] = useState('status', null)

  const checkAuth = async () => {
    const res = await userStore.checkAuth()
    setStatus(res)
  }

  useEffect(() => {
    if(auth && !userStore.state.isAuthenticated) {
      checkAuth()
    } else {
      setStatus(true)
    }
  }, [children])

  if(status === true) {
    return children
  }

  navigate('/register')
}
