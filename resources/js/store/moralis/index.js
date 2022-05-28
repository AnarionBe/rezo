import { useState } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

export const useMoralis = () => {
  const [nfts, setNfts] = useState([])
  const web3Api = useMoralisWeb3Api()

  const fetchNfts = async ({ chains, addresses }) => {
    const requests = []
    chains.forEach(chain => requests.push(...addresses.map(address => web3Api.account.getNFTs({ chain, address }))))

    const res = await Promise.all(requests)
    const results = []
    res.forEach(({ result }) => results.push(...result))
    for(const idx in results) {
      const { data } = await axios.get(results[idx].token_uri)

      if(data.image.includes('ipfs://')) data.image = `https://ipfs.io/ipfs/${data.image.replace('ipfs://', '')}`

      results[idx].metadata = data
    }
    setNfts(results)
  }

  return {
    state: {
      nfts,
    },
    fetchNfts
  }
}
