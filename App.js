import React from 'react'
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

// Components
import Home from './components/Home'
import Campaign from './components/Campaign'
import CampaignList from './components/CampaignList'

const RootStack = createStackNavigator({
  Home: { screen: Home },
  Campaign: { screen: Campaign },
  CampaignList: { screen: CampaignList },
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerBackTitle: null
  }
})

const App = createAppContainer(RootStack)

export default App