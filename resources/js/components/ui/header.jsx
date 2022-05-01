import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Button } from 'components/actions/button'

export const Header = ({}) => {
  const { auth } = useContext(StoreContext)

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>Rezo</div>

        <div>
          <Button
            appearance="link"
            className="flex items-center gap-2"
            to={{ pathname: '/profile' }}
          >
            {auth.state.currentUser.username}

            <img
              className="rounded-full h-8 w-8"
              src={ auth.state.currentUser.profile_picture }
            />
          </Button>
        </div>
      </div>
    </header>
  )
}
