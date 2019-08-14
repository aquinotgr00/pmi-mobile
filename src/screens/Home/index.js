import React from 'react'
import { Image, RefreshControl } from 'react-native'
import { Screen } from 'src/components'
import SearchBar from './SearchBar'
import DonationButtons from './DonationButtons'
import RecentCampaigns from './RecentCampaigns'
import HomeBanner from './HomeBanner'

export default class HomeScreen extends React.Component {
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
        unpadded
        title={<Image source={require('assets/images/logo-home.png')} />}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <SearchBar />
        <DonationButtons />
        <RecentCampaigns
          title='Donasi Umum'
          numberOfCampaigns={3}
          campaignType={1}
          lastUpdate={this.state.timestamp}
        />
        <RecentCampaigns
          title='Donasi Khusus'
          numberOfCampaigns={3}
          campaignType={2}
          lastUpdate={this.state.timestamp}
        />
        <HomeBanner navigation={this.props.navigation} />
        <RecentCampaigns
          title='Bulan Dana'
          numberOfCampaigns={3}
          campaignType={3}
          lastUpdate={this.state.timestamp}
        />
      </Screen>
    )
  }
}
