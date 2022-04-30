import React, { useContext } from 'react'
import { StoreContext } from '@store'
import { Button } from '@components/actions/button'

export const Header = ({}) => {
  const { auth } = useContext(StoreContext)

  return (
    <header className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>Rezo</div>

        <div>
          <Button
            appearance="link"
            className="flex items-center"
            to={{ pathname: '/profile' }}
          >
            {auth.state.currentUser.username}

            <img
              className="rounded-full ml-4 h-8"
              src={ `https://avatars.dicebear.com/v2/jdenticon/${auth.state.currentUser.username}.svg` }
            />
          </Button>
        </div>
      </div>
    </header>
  )
}
