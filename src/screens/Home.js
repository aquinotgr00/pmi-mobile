import React from 'react'
import { Text } from 'react-native'
import { IconInu, Screen } from 'src/components'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <IconInu name='icon-pmi-home' color={tintColor} />
      ),
    };
  
    render() {
      return (
        <Screen title='Home' menu>
          <Text>ini Home Screen</Text>
        </Screen>
      );
    }
  }