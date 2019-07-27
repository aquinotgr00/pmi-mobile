import React from 'react'
import { NavigationActions } from 'react-navigation'
import { Button, Input, Item, Text } from 'native-base'
import { Screen } from 'src/components'

export default class DonatorRegistrationFormScreen extends React.Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit () {
    console.log('submitted!')
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
  }

  render () {
    return (
      <Screen title='Daftar Sebagai Donatur' back>
        <Item>
          <Input placeholder='Nama' />
        </Item>
        <Item>
          <Input placeholder='Email' />
        </Item>
        <Item>
          <Input placeholder='Nomor HP' />
        </Item>
        <Item>
          <Input placeholder='Password' secureTextEntry />
        </Item>
        <Item>
          <Input placeholder='Konfirmasi Password' secureTextEntry />
        </Item>
        <Item>
          <Input placeholder='Tanggal Lahir' />
        </Item>

        <Button rounded danger onPress={this.handleFormSubmit}>
          <Text>Lanjutkan</Text>
        </Button>
      </Screen>
    )
  }
}
