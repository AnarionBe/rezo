import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { StoreContext } from './store'
import { basil } from '@spices/basil'

export default () => {
  const appStore = useContext(StoreContext)

  const getView = () => {
    const View = basil.get(appStore, 'navigation.state.currentRoute.component')
    const props = basil.get(appStore, 'navigation.state.props')

    return <View {...props} />
  }

  return (
    <div>
      <Routes>
        <Route path="/" render={getView} />
      </Routes>
    </div>
  )
}
