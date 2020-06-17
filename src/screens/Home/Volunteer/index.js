import React, { Component } from 'react'
import { Image, RefreshControl } from 'react-native'
import { Screen } from 'src/components'
import GeneralDiscussion from './GeneralDiscussion'
import NewlyPublishedEvents from './NewlyPublishedEvents'
import MyParticipations from './MyParticipations'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      refreshing: false,
      timestamp: Date.now()
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  onRefresh () {
    this.setState({ timestamp: Date.now() })
  }

  render () {
    return (
      <Screen
        menu
        title={<Image source={require('assets/images/logo-home.png')} />}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        containerStyle={{ paddingBottom: 100 }}
      >
        <GeneralDiscussion lastUpdate={this.state.timestamp} />
        <NewlyPublishedEvents lastUpdate={this.state.timestamp} numberOfEvents={3} />
        <MyParticipations />
      </Screen>
    )
  }
}
