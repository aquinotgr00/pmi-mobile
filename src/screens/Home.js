import React from 'react'
import { Button, Text } from 'native-base'
import { IconInu, Screen, CampaignList, HomeBanner } from 'src/components'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <IconInu name='icon-pmi-home' color={tintColor} />
      ),
    }

    constructor(props) {
      super(props)
      this.state = {
        percentage: 50,
        generalCampaigns: [],
        data: [
          {key:'a'},
          {key:'b'},
          {key:'c'},
        ]
      }
    
      this.navigateToInKindDonationForm = this.navigateToInKindDonationForm.bind(this)
    }
    
    navigateToInKindDonationForm() {
      this.props.navigation.navigate('InKindDonationForm')
    }

    render() {
      return (
        <Screen title='Home' menu>
          <CampaignList title='Donasi Umum' data={this.state.data} />

          <HomeBanner />

          {/* <Button bordered onPress={this.navigateToInKindDonationForm}>
            <Text>Mock Donasi Barang</Text>
          </Button> */}
        </Screen>
      );
    }
  }