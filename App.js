import React from 'react'
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

// Components
import CampaignList from './components/CampaignList'
import Campaign from './components/Campaign'

const RootStack = createStackNavigator({
  CampaignList: { screen: CampaignList },
  Campaign: { screen: Campaign }
},
{
  initialRouteName: 'CampaignList'
})

const App = createAppContainer(RootStack)

export default App