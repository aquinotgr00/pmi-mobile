import React from 'react'
import { Button } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { IconInu, Screen } from 'src/components'

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
  
    this.navigateToInKindDonationForm = this.navigateToInKindDonationForm.bind(this)
  }
  
  navigateToInKindDonationForm() {
    this.props.navigation.navigate('InKindDonationForm')
  }

  async componentDidMount() {
    // const generalCampaigns = await basicRequest().get('/app/campaigns?t=1')
    // this.setState({
    //   generalCampaigns
    // })
  }

  render() {
    return (
      <Screen title='Home' menu>
        <Button bordered onPress={this.navigateToInKindDonationForm}>
          <Text>Mock Donasi Barang</Text>
        </Button>
        <View style={{flex:1,flexDirection:'row',marginBottom:15}}>
          <Text style={[styles.campaignTitleList, {width: '50%'}]}>Donasi Umum</Text>
          <TouchableOpacity style={{width: '50%'}} onPress={() => navigation.navigate('CampaignList', {param: 'donasi-umum'})}>
            <Text style={{textAlign: 'right',color: 'red',fontSize: 13,fontWeight: '600'}}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
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