import React from 'react'
import { Image } from 'react-native'
import { Button, Input, Item, Text } from 'native-base'
import { Screen } from 'src/components'

export default class ForgotPasswordScreen extends React.Component {
  constructor (props) {
    super(props)

    this.requestPasswordReset = this.requestPasswordReset.bind(this)
  }

  requestPasswordReset () {
    console.log('request password reset')
  }

  render () {
    return (
      <Screen title='Lupa Password' back>
        <Image source={require('assets/images/lupa-password.png')} />
        <Text>Lupa Password?</Text>
        <Text>Jangan panik, kami akan segera mengirimkan link untuk reset password ke alamat E-mail anda</Text>
        <Item>
          <Input placeholder='Email' />
        </Item>

        <Button rounded danger onPress={this.requestPasswordReset}>
          <Text>Kirim Password</Text>
        </Button>
      </Screen>
    )
  }
}
