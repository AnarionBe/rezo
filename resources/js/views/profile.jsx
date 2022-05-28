import React, { useContext } from 'react'
import { StoreContext } from 'store'
import { Header } from 'components/ui/header'
import { Nft } from 'components/ui/nft'

export const Profile = ({}) => {
  const { user, moralis } = useContext(StoreContext)

  const renderNfts = () => {
    return moralis.state.nfts.map(nft => {
      return (
        <Nft key={ nft.token_id } nft={ nft } />
      )
    })
  }

  return (
    <>
      <Header />

      <div className="view-profile">
        <aside className="view-profile__aside">
          <div className="view-profile__user-info">
            <div className="view-profile__avatar">
              <img src={ user.state.currentUser?.avatar } />

              <div className="view-profile__avatar-overlay">
                Select pic
              </div>
            </div>

            <h3 className="view-profile__username">{ user.state.currentUser?.username }</h3>
          </div>
        </aside>

        <div className="view-profile__body">
          { renderNfts() }
        </div>
      </div>
    </>
  )
}
