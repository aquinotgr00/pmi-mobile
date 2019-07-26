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
  };

  render() {
    return (
      <Screen title='Daftar Sebagai Donatur' menu>
        
        <Image source={require('PmiJkt/assets/images/daftar-donatur.png')} />
        <Button rounded danger>
          <Text>Daftar</Text>
        </Button>
        <Button transparent>
          <Text>Sudah memiliki akun? <Text>Masuk</Text></Text>
        </Button>
        
      </Screen>
    );
  }
}