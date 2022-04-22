import React, { createContext } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from '../routes'

const StoreContext = createContext({});

const StoreProvider = () => {
  const router = useRoutes(routes);

  return (
    <StoreContext.Provider
      value={{

      }}
    >
      { router }
    </StoreContext.Provider>
  );
}

export {StoreContext, StoreProvider};
