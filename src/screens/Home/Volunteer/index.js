import React, { Component } from 'react'
import { Image, RefreshControl } from 'react-native'
import { Screen } from 'src/components'
import GeneralDiscussion from './GeneralDiscussion'
import NewlyPublishedEvents from './NewlyPublishedEvents'
import MyParticipations from './MyParticipations'

export default class HomeScreen extends Component {
  render () {
    return (
      <Screen
        menu
        title={<Image source={require('assets/images/logo-home.png')} />}
        refreshControl={
          <RefreshControl

          />
        }
      >
        <GeneralDiscussion />
        <NewlyPublishedEvents numberOfEvents={3} />
        <MyParticipations />
      </Screen>
    )
  }
}
