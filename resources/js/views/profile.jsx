import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Header } from 'components/ui/header'
import { Button } from 'components/actions/button'

export const Profile = ({}) => {
  const { user } = useContext(StoreContext)

  const handleLinkWallet = async e => {
    e.preventDefault()

    if(!window.ethereum) {
      return alert('Please install MetaMask')
    }

    const res = await window.ethereum.enable()

    if(res[0]) {
      user.linkWallet(res[0])
    }
  }

  const renderWallet = () => {
    const { wallet } = user.state.currentUser

    if(wallet) {
      return <span className="text-sm">{ `${wallet.substring(0, 15)}...${wallet.substring(wallet.length - 4)}` }</span>
    }

    return (
      <Button
        appearance="subtle"
        action={ e => handleLinkWallet(e) }
        size="xs"
      >Link your Polygon wallet</Button>
    )
  }

  return (
    <>
      <Header />

      <div className="view-profile">
        <aside className="view-profile__aside">
          <div className="view-profile__user-info">
            <div className="view-profile__avatar">
              <img src={ user.state.currentUser?.profile_picture } />

              <div className="view-profile__avatar-overlay">
                Select pic
              </div>
            </div>

            <h3 className="view-profile__username">{ user.state.currentUser?.username }</h3>
            {/* <div className="flex justify-center p-1 border-2 border-gray-700 rounded-3xl w-64 max-w-full mt-2">{ renderWallet() }</div> */}
          </div>
        </aside>

        <div className="view-profile__body">

        </div>
      </div>
    </>
  )
}
