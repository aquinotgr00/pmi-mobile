import React from 'react'
import { Button } from 'native-base'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { IconInu, Screen } from 'src/components'
import Config from 'react-native-config'
import PaymentGateway from 'react-native-payment-gateway'

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
    this.pay = this.pay.bind(this)
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

  pay() {
    const optionConect = {
      clientKey: 'SB-Mid-client-5cSArh5V34nHg_JD',
      urlMerchant: 'https://webapi-develop-pmi-public.blm.solutions',
      sandbox : true
    }
    console.log(optionConect);
    
    const transRequest = {
        transactionId: "0001",
        totalAmount: 4000
    }

    const itemDetails = [
        {id: "001", price: 1000, qty: 4, name: "peanuts"}
    ];

    const creditCardOptions = {
        saveCard: false,
        saveToken: false,
        paymentMode: "Normal",
        secure: false
    };

    const userDetail = {
        fullName: "jhon",
        email: "jhon@payment.com",
        phoneNumber: "0850000000",
        userId: "U01",
        address: "street coffee",
        city: "yogyakarta",
        country: "IDN",
        zipCode: "59382"
    };

    const optionColorTheme = {
        primary: '#c51f1f',
        primaryDark: '#1a4794',
        secondary: '#1fce38'
    }

    const optionFont = {
        defaultText: "open_sans_regular.ttf",
        semiBoldText: "open_sans_semibold.ttf",
        boldText: "open_sans_bold.ttf"
    }

    const callback = (res) => {
        console.log(res)
    };

    PaymentGateway.checkOut(
        optionConect,
        transRequest,
        itemDetails,
        creditCardOptions,
        userDetail,
        optionColorTheme,
        optionFont,
        callback
    );
  }

  render() {
    return (
      <Screen title='Home' menu>
        <Button bordered onPress={this.navigateToInKindDonationForm}>
          <Text>Mock Donasi Barang</Text>
        </Button>
        <Button bordered onPress={this.pay}>
          <Text>Mock Midtrans</Text>
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