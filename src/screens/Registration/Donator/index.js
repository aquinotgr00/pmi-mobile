import React from 'react'
import { Image } from 'react-native'
import { Button, Text } from 'native-base'
import { IconInu, Screen } from 'src/components'

export class DonatorRegistrationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Daftar Donatur',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-donatur-regist' color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  
    this.navigateToLogin = this.navigateToLogin.bind(this)
    this.navigateToRegistrationForm = this.navigateToRegistrationForm.bind(this)
  }

  navigateToRegistrationForm() {
    this.props.navigation.navigate('DonatorRegistrationForm')
  }
  
  navigateToLogin() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Screen title='Daftar Sebagai Donatur' menu>
        
        <Image source={require('assets/images/daftar-donatur.png')} />
        <Button rounded danger onPress={this.navigateToRegistrationForm}>
          <Text>Daftar</Text>
        </Button>
        <Button transparent onPress={this.navigateToLogin}>
          <Text>Sudah memiliki akun? <Text>Masuk</Text></Text>
        </Button>
        
      </Screen>
    );
  }
}