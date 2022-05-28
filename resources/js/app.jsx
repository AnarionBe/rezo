import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MoralisProvider } from 'react-moralis'

import '../style/app.scss'
import 'babel-polyfill'

import { StoreProvider } from './store'

const Root = () => {
  return (
    <React.StrictMode>
      <MoralisProvider serverUrl={ process.env.MORALIS_SERVER_URL } appId={ process.env.MORALIS_APP_ID } >
        <BrowserRouter>
          <StoreProvider />
        </BrowserRouter>
      </MoralisProvider>
    </React.StrictMode>
  )
}

const root = ReactDom.createRoot(document.getElementById('app'))

root.render(<Root />)
