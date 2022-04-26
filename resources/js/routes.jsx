import React from 'react'

import { Home } from '@views/home'
import { Register } from '@views/register'
import { Login } from '@views/login'

export default [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
]
