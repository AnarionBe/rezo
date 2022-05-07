import React, { createContext, useEffect } from 'react'
import {
  useRoutes,
  useNavigate,
} from 'react-router-dom'
import Axios from 'axios'
import { GuardedRoute } from 'components/guarded-route'

import { useUser } from 'store/user'
import { usePosts } from 'store/posts'

import routes from '@/js/routes'

const StoreContext = createContext({});

const StoreProvider = () => {
  const axios = Axios.create({ baseURL: '/api/v1' })

  const router = useRoutes(routes)
  const navigate = useNavigate()

  const user = useUser({ axios, navigate })
  const posts = usePosts({ axios, navigate })

  return (
    <StoreContext.Provider
      value={{
        user,
        posts,
        router: {
          navigate,
        },
      }}
    >
      <GuardedRoute userStore={ user }>
      { router }
      </GuardedRoute>
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
