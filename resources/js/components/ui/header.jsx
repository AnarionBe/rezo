import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Button } from 'components/actions/button'

export const Header = ({}) => {
  const { user } = useContext(StoreContext)

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Button
          appearance="link"
          to={{ pathname: '/' }}
        >Rezo</Button>

        <div>
          { user.state.isAuthenticated && (
            <Button
              appearance="link"
              className="flex items-center gap-2"
              to={{ pathname: '/profile' }}
            >
              {user.state.currentUser.username}

              <img
                className="rounded-full h-8 w-8"
                src={ user.state.currentUser.profile_picture }
              />
            </Button>
          )}

          { !user.state.isAuthenticated && (
            <Button
              appearance="link"
              className="flex items-center gap-2"
              to={{ pathname: '/login' }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
