import React from 'react'
import { Button, CheckBox, Icon, Input, Item, Picker, Text } from 'native-base'
import { Screen } from 'src/components'

export default class InKindDonationFormScreen extends React.Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit () {
    console.log('submitted!')
  }

  render () {
    return (
      <Screen title='Berdonasi Barang' back>
        <Text>Informasi Donasi</Text>
        <Item>
          <Input placeholder='Nama' />
        </Item>
        <Item>
          <Input placeholder='Email' />
        </Item>
        <Item>
          <Input placeholder='Nomor HP' />
        </Item>

        <Picker
          mode='dropdown'
          iosIcon={<Icon name='arrow-down' />}
          placeholder='Metode Penyerahan'
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor='#007aff'
          style={{ width: undefined }}
        >
          <Picker.Item label='Barang dikirim' value='key0' />
          <Picker.Item label='Barang diantar' value='key1' />
        </Picker>

        <Text>Barang Donasi</Text>
        
        <CheckBox checked /><Text>Sembunyikan nama saya (Anonim)</Text>
        <Button rounded danger onPress={this.handleFormSubmit}>
          <Text>Lanjutkan</Text>
        </Button>
      </Screen>
    )
  }
}
