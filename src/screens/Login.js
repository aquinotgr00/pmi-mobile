import React from 'react'
import { Image } from 'react-native'
import { Button, Input, Item, Text } from 'native-base'
import { Screen } from 'src/components'

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.forgotPassword = this.forgotPassword.bind(this)
  }

  forgotPassword () {
    this.props.navigation.navigate('ForgotPassword')
  }

  render () {
    return (
      <Screen title='Masuk Sebagai Donatur' back>
        <Image source={require('assets/images/login.png')} />
        <Item>
          <Input placeholder='Email' />
        </Item>
        <Item>
          <Input placeholder='Password' secureTextEntry />
        </Item>

        <Button rounded danger>
          <Text>Masuk</Text>
        </Button>
        <Button transparent onPress={this.forgotPassword}>
          <Text>Lupa Password?</Text>
        </Button>
      </Screen>
    )
  }
}
