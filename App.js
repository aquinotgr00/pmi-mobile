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
import OneSignal from 'react-native-onesignal'
import Config from 'react-native-config'
import AppNavigator from 'src/components/AppNavigator'

export default class App extends Component {
  constructor (properties) {
    super(properties)
    OneSignal.init(Config.ONESIGNAL_APP_ID)

    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived (notification) {
    console.log('Notification received: ', notification)
  }

  onOpened (openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  onIds (device) {
    console.log('Device info: ', device)
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
