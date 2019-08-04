import React from 'react'
import { Screen } from 'src/components'
import SearchBar from './SearchBar'
import DonationTypeButtons from './DonationTypeButtons'
import RecentCampaigns from './RecentCampaigns'
import HomeBanner from './HomeBanner'
import { Image } from 'react-native'

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      donationType: undefined
    }

    this.handleChangeDonationType = this.handleChangeDonationType.bind(this)
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
      <Screen unpadded title={<Image source={require('assets/images/logo-home.png')} />} menu>
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
        />
        <RecentCampaigns
          title='Donasi Khusus'
          numberOfCampaigns={3}
          campaignType={2}
          donationType={this.state.donationType}
        />
        <HomeBanner navigation={this.props.navigation} />
        <RecentCampaigns
          title='Bulan Dana'
          numberOfCampaigns={3}
          campaignType={3}
        />
      </Screen>
    )
  }
}
