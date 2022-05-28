import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Button } from 'components/actions/button'
import { UserPresentation } from 'components/ui/user-presentation'

export const Header = ({}) => {
  const { user, moralis } = useContext(StoreContext)

  const handleConnectWallet = async e => {
    e.preventDefault()
    e.stopPropagation()

    if(!window.ethereum) {
      return alert('Please install MetaMask')
    }

    const res = await window.ethereum.enable()

    if(res[0]) {
      moralis.fetchNfts({ chains: ['polygon', 'bsc'], addresses: res })
      user.login({ wallet: res[0] })
    }
  }

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
              action={ e => handleConnectWallet(e) }
              klass="ui-header__connect-metamask"
            >
              <span>Connect your wallet</span>
              <img
                className="ui-header__wallet-logo"
                src="/assets/sayl-logomark-yellow.svg"
              />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
