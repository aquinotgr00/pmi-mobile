import React, { Component } from 'react'
import { Image, RefreshControl } from 'react-native'
import { Screen } from 'src/components'

export default class HomeScreen extends Component {
  render() {
    return (
      <Screen
        menu
        title={<Image source={require('assets/images/logo-home.png')} />}
        refreshControl={
          <RefreshControl
            
          />
        }
      />
    )
  }
}
