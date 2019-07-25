import React, { Component } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'src/store'
import PmiJakarta from 'src/components/PmiJakarta'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PmiJakarta />
        </PersistGate>
      </Provider>
    )
  }
}
