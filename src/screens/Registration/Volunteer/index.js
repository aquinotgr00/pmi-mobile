import React from 'react'
import { Text } from 'react-native'
import { IconInu } from 'src/components'
import { Step1 } from './Step1'

export class VolunteerRegistrationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login/Register Relawan',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-relawan-regist' color={tintColor} />
    ),
  };

  render() {
    return (
      <Step1 />
    );
  }
}