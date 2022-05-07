import React from 'react'

import { Home } from 'views/home'
import { Register } from 'views/register'
import { Login } from 'views/login'
import { Profile } from 'views/profile'
import { Post } from 'views/post'

export default [
  {
    path: '/',
    element: <Home name="home" />,
  },
  {
    path: '/register',
    element: <Register name="register" />,
  },
  {
    path: '/login',
    element: <Login name="login" />,
  },
  {
    path: '/profile',
    element: <Profile auth name="profile" />,
  },
  {
    path: '/post/:id',
    element: <Post name="post" />,
  }
]
