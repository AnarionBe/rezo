import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Button } from 'components/actions/button'
import { UserPresentation } from 'components/ui/user-presentation'

export const Header = ({}) => {
  const { user } = useContext(StoreContext)

  return (
    <header className="ui-header">
      <div className="ui-header__container">
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
              <UserPresentation user={ user.state.currentUser } inverted />
            </Button>
          )}

          { !user.state.isAuthenticated && (
            <Button
              appearance="link"
              to={{ pathname: '/login' }}
            >Login</Button>
          )}
        </div>
      </div>
    </header>
  )
}
