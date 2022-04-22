import React from 'react'
import ReactDom from 'react-dom/client'

import '../css/app.css'
import App from './index'

const root = ReactDom.createRoot(document.getElementById('app'))

root.render(<App />)
