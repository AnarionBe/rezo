import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Header } from 'components/ui/header'
import { Button } from 'components/actions/button'
import axios from 'axios'

export const Profile = ({}) => {
  const { auth } = useContext(StoreContext)

  const handleLinkWallet = async e => {
    e.preventDefault()

    if(!window.ethereum) {
      return alert('Please install MetaMask')
    }

    const res = await window.ethereum.enable()

    if(res[0]) {
      axios.post(`/api/v1/users/${auth.state.currentUser.id}/link-wallet`, { wallet: res[0] })
    }
  }

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-8 mt-8">
        <aside className="w-full sm:w-1/3 lg:w-1/4 bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full h-32 w-32 border-2 border-gray-700"
              src={ auth.state.currentUser.profile_picture }
            />

            <h3 className="text-2xl mt-4">{ auth.state.currentUser.username }</h3>
          </div>
        </aside>
        <div className="bg-gray-700 p-4 flex-1">
          <Button
            action={ e => handleLinkWallet(e) }
          >Link a Polygon wallet</Button>
        </div>
      </div>
    </>
  )
}
