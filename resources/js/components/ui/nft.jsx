import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'components/actions/button'

export const Nft = ({ nft }) => {
  const [type, setType] = useState(null)

  useEffect(() => {
    getAssetType()
  }, [])

  const getAssetType = async () => {
    const { headers } = await axios.head(nft.metadata.image)

    if(headers['content-type'].includes('video')) return setType('video')

    return setType('image')
  }

  const renderImage = () => {
    if(type === 'video') {
      return <video type="video/mp4" src={nft.metadata.image} autoPlay loop></video>
    }

    return <img src={nft.metadata.image} alt={ nft.metadata.name } />
  }


  return (
    <div className="ui-nft">
      <div className="ui-nft__figure">
        { renderImage() }
      </div>

      <div className="ui-nft__data">
        <h3 className="title">{ nft.metadata.name }</h3>
        { nft.metadata.description && (
          <p className="description">{ nft.metadata.description }</p>
        )}

        <Button klass="ui-nft__cta">Join the conversation</Button>
      </div>
    </div>
  )
}
