import React, { createContext, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Axios from 'axios'
import { GuardedRoute } from 'components/guarded-route'

import { useAuth } from 'store/auth'
import { usePosts } from 'store/posts'

import routes from '@/js/routes'

const StoreContext = createContext({});

const StoreProvider = () => {
  const axios = Axios.create({ baseURL: '/api/v1' })

  const router = useRoutes(routes)
  const auth = useAuth({ axios })
  const posts = usePosts({ axios })

  return (
    <StoreContext.Provider
      value={{
        auth,
        posts
      }}
    >
      <GuardedRoute authStore={ auth }>
      { router }
      </GuardedRoute>
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
