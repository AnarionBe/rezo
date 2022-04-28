import React, { useEffect } from 'react'
import { basil } from '@spices/basil'
import { useNavigate } from 'react-router-dom'

export const GuardedRoute = ({ children, authStore }) => {
  const { auth = false, name = 'register'} = basil.get(children, 'props.children.props', {})
  const navigate = useNavigate()

  useEffect(() => {
    if(auth) {
      authStore.checkAuth()
    }
  }, [children])

  useEffect(() => {
    if(auth && !authStore.state.isLoggedIn) {
      navigate('/register')
    }
  }, [authStore.state.isLoggedIn])

  if(!auth || authStore.state.isLoggedIn) {
    return children
  }
}
