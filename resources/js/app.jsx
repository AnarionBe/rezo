import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '../css/app.scss'
import 'babel-polyfill'

import { StoreProvider } from './store'

const Root = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider />
      </BrowserRouter>
    </React.StrictMode>
  )
}

const root = ReactDom.createRoot(document.getElementById('app'))

root.render(<Root />)
