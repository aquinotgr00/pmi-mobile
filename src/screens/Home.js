import React from 'react'
import { Button, Text } from 'native-base'
import { IconInu, Screen } from 'src/components'

export default class HomeScreen extends React.Component {
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

    render() {
      return (
        <Screen title='Home' menu>
          <Text>ini Home Screen</Text>
          <Button bordered onPress={this.navigateToInKindDonationForm}>
            <Text>Mock Donasi Barang</Text>
          </Button>
        </Screen>
      );
    }
  }