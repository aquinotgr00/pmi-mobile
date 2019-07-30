import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, CheckBox, Icon, Input, Item, Picker, Text } from 'native-base'
import { RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'

class InKindDonationFormScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addItem = this.addItem.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  handleFormSubmit () {
    const { token } = this.props.user
    let routeName = 'DonatorNavigator'
    if (token) {
      routeName = 'GuestNavigator'
    }
    this.props.navigation.navigate(routeName)
  }

  addItem () {
    this.setState({ items: [...this.state.items, { itemType: '', name: '', qty: 0 }] })
  }

  onValueChange () {

  }

  render () {
    return (
      <Screen title='Berdonasi Barang' back>
        <View style={{ paddingBottom: 30 }}>
          <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Informasi Donasi</Text>
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
            onValueChange={this.onValueChange}
          >
            <Picker.Item label='Barang dikirim' value='key0' />
            <Picker.Item label='Barang diantar' value='key1' />
          </Picker>

          <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Barang Donasi</Text>

          {
            this.state.items.map((item, i) => (
              <DonationItem
                itemId={i}
                key={`${i}`}
              />
            ))
          }

          <Button transparent full onPress={this.addItem}>
            <Text style={{ color: Color.red }}>Tambah Barang +</Text>
          </Button>

          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <CheckBox color='red' style={{ borderRadius: 3 }} />
            <Text style={{ marginLeft: 20 }}>Sembunyikan nama saya (Anonim)</Text>
          </View>
          { this.state.items.length > 0 && <RedButton text='Lanjutkan' onPress={this.handleFormSubmit} style={{ marginTop: 30 }} /> }
        </View>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(InKindDonationFormScreen)

class DonationItem extends React.Component {
  render () {
    console.log(this.props.itemId)
    return (
      <View style={{ borderRadius: 10, borderWidth: 1, borderColor: Color.lightGray, padding: 5, marginVertical: 10 }}>
        <Item>
          <Input placeholder='Jenis Barang Donasi' />
        </Item>
        <Item>
          <Input placeholder='Nama Barang' />
        </Item>
        <Item>
          <Input placeholder='Jumlah Barang' />
        </Item>
      </View>
    )
  }
}
