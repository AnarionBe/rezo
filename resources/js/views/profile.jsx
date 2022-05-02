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

      <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-8 mt-8">
        <aside className="w-full sm:w-1/3 lg:w-1/4 bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-full h-32 w-32 border-2 border-gray-700 relative">
              <img src={ user.state.currentUser?.profile_picture } />

              <div className="opacity-0 hover:opacity-100 flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-80">
                Select pic
              </div>
            </div>

            <h3 className="text-2xl mt-4">{ user.state.currentUser?.username }</h3>
            <div className="flex justify-center p-1 border-2 border-gray-700 rounded-3xl w-64 max-w-full mt-2">{ renderWallet() }</div>
          </div>
        </aside>
        <div className="bg-gray-800 rounded-lg p-4 flex-1">

        </div>
      </div>
    </>
  )
}
