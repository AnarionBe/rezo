import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '../css/app.css'

import { StoreProvider } from './store'

const Root = () => {
  return (
    <BrowserRouter>
      <StoreProvider />
    </BrowserRouter>
  )
}

const root = ReactDom.createRoot(document.getElementById('app'))

root.render(<Root />)


