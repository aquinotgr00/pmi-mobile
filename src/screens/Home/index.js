import React from 'react'
import { Image, RefreshControl } from 'react-native'
import { Screen } from 'src/components'
import SearchBar from './SearchBar'
import DonationTypeButtons from './DonationTypeButtons'
import RecentCampaigns from './RecentCampaigns'
import HomeBanner from './HomeBanner'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      refreshing: false,
      donationType: undefined,
      timestamp: Date.now()
    }

    this.handleChangeDonationType = this.handleChangeDonationType.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onRefresh () {
    this.setState({ timestamp: Date.now() })
  }

  handleChangeDonationType (donationType) {
    if (donationType === this.state.donationType) {
      this.setState({ donationType: undefined })
    } else {
      this.setState({ donationType })
    }
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
        <DonationTypeButtons
          activeButton={this.state.donationType}
          onChange={this.handleChangeDonationType}
        />
        <RecentCampaigns
          title='Donasi Umum'
          numberOfCampaigns={3}
          campaignType={1}
          donationType={this.state.donationType}
          lastUpdate={this.state.timestamp}
        />
        <RecentCampaigns
          title='Donasi Khusus'
          numberOfCampaigns={3}
          campaignType={2}
          donationType={this.state.donationType}
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
