// import React from 'react'
// import {
//   createStackNavigator,
//   createAppContainer
// } from 'react-navigation'

// // Components
// import Home from './components/Home'
// import Campaign from './components/Campaign'
// import CampaignList from './components/CampaignList'

// const RootStack = createStackNavigator({
//   Home: { screen: Home },
//   Campaign: { screen: Campaign },
//   CampaignList: { screen: CampaignList },
// },
// {
//   initialRouteName: 'Home',
//   defaultNavigationOptions: {
//     headerTintColor: '#fff',
//     headerBackTitle: null
//   }
// })

// const App = createAppContainer(RootStack)

// export default App
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
