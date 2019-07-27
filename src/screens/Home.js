import React from 'react'
import { IconInu, Screen, CampaignList, HomeBanner } from 'src/components'
import { StyleSheet } from 'react-native'
import axios from 'axios'

export default class HomeScreen extends React.Component {
    state = {
      loading: true,
      generalCampaigns: [],
      specialCampaigns: [],
      bulanDana: [],
      percentage: 50,
    }

    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <IconInu name='icon-pmi-home' color={tintColor} />
      ),
    }

    constructor(props) {
      super(props)
    
      this.navigateToInKindDonationForm = this.navigateToInKindDonationForm.bind(this)
      this.getCampaignList = this.getCampaignList.bind(this)
    }

    componentDidMount () {
      this.getCampaignList(1)
      this.getCampaignList(2)
      this.getCampaignList(3)
    }

    getCampaignList(t) {
      axios.get('http://test-donatur.test/api/app/campaigns?t='+t)
        .then(res => {
          switch (t) {
            case 1:
              this.setState({generalCampaigns:res.data.data.data})
              break;
            case 2:
              this.setState({specialCampaigns:res.data.data.data})
              break;
            case 3:
              this.setState({bulanDana:res.data.data.data})
              break;
          
            default:
              break;
          }
        })
    }
    
    navigateToInKindDonationForm() {
      this.props.navigation.navigate('InKindDonationForm')
    }

    render() {
      return (
        <Screen title='Home' menu>
          <CampaignList
            type={1}
            title='Donasi Umum'
            data={this.state.generalCampaigns.slice(0, 3)}
            navigation={this.props.navigation}
          />

          <CampaignList
            type={2}
            title='Donasi Khusus'
            data={this.state.specialCampaigns.slice(0, 3)}
            navigation={this.props.navigation}
          />

          <HomeBanner />

          <CampaignList
            type={3}
            title='Bulan Dana'
            data={this.state.bulanDana.slice(0, 3)}
            navigation={this.props.navigation}
          />

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