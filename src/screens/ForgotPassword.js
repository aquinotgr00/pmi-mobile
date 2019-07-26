import React from 'react'
import { Image } from 'react-native'
import { Button, Input, Item, Text } from 'native-base'
import { Screen } from 'src/components'

export default class ForgotPasswordScreen extends React.Component {
  render () {
    return (
      <Screen title='Lupa Password' back>
        <Image source={require('PmiJkt/assets/images/login.png')} />
        <Item>
          <Input placeholder='Email' />
        </Item>

        <Button rounded danger>
          <Text>Kirim Password</Text>
        </Button>
      </Screen>
    )
  }
}
