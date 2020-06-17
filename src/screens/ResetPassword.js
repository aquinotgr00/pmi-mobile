import React from 'react'
import { Button, Input, Item, Text } from 'native-base'
import { Screen } from 'src/components'

export default class ResetPasswordScreen extends React.Component {
  render () {
    return (
      <Screen title='Reset Password' back>

        <Item>
          <Input placeholder='New Password' secureTextEntry />
        </Item>
        <Item>
          <Input placeholder='Confirm Password' secureTextEntry />
        </Item>

        <Button rounded danger>
          <Text>Reset Password</Text>
        </Button>
      </Screen>
    )
  }
}
