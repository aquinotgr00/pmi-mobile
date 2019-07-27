import React from 'react'
import { IconInu, Screen, CampaignList, HomeBanner } from 'src/components'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class HomeScreen extends React.Component {
    state = {
      loading: true,
      generalCampaigns: []
    }

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
          <CampaignList title='Donasi Umum' data={this.state.data} navigation={this.props.navigation} />

          <CampaignList title='Donasi Khusus' data={this.state.data} navigation={this.props.navigation} />

          <HomeBanner />

          <CampaignList title='Bulan Dana' data={this.state.data} navigation={this.props.navigation} />

          {/* <Button bordered onPress={this.navigateToInKindDonationForm}>
            <Text>Mock Donasi Barang</Text>
          </Button> */}
        </Screen>
      );
    }
}

const styles = StyleSheet.create({
  campaignTitleList: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: .5,
  },
})