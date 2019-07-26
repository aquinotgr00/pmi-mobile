import React from 'react'
import { Text } from 'react-native'
import { IconInu, Screen } from 'src/components'

export class VolunteerRegistrationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Daftar Relawan',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-relawan-regist' color={tintColor} />
    ),
  };

  render() {
    return (
      <Screen title='Daftar Sebagai Relawan' menu>
        <Text>ini pendaftaran relawan</Text>
      </Screen>
    );
  }
}