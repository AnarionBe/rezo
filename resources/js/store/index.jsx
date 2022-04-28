import React, { createContext, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { useAuth } from '@store/auth'
import { GuardedRoute } from '@components/guarded-route'

import routes from '@/js/routes'

const StoreContext = createContext({});

const StoreProvider = () => {
  const router = useRoutes(routes)
  const auth = useAuth()

  return (
    <StoreContext.Provider
      value={{
        auth,
      }}
    >
      <GuardedRoute authStore={auth}>
      { router }
      </GuardedRoute>
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
