import React from 'react'

import { Home } from '@views/home'
import { Register } from '@views/register'
import { Login } from '@views/login'

export default [
  {
    path: '/',
    element: <Home auth name="home" />,
  },
  {
    path: '/register',
    element: <Register name="register" />,
  },
  {
    path: '/login',
    element: <Login name="login" />,
  }
]
