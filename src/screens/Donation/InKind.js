import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Button, CheckBox, Icon, Input, Item, Label, Picker, Text } from 'native-base'
import { Formik, FieldArray } from 'formik'
import { FormField, FormSectionTitle, RedButton, Screen } from 'src/components'
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
        <Formik
          initialValues={{ name: '', email: '', phone: '', anonym: false, items: [] }}
          onSubmit={values => console.log(values)}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <FormSectionTitle text='Informasi Donasi' />
              <FormField label='Nama'>
                <Input
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                />
              </FormField>
              <FormField label='Email'>
                <Input
                  keyboardType='email-address'
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  autoCapitalize='none'
                />
              </FormField>
              <FormField label='Nomor HP'>
                <Input
                  keyboardType='phone-pad'
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                />
              </FormField>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                placeholder='Metode Penyerahan'
                placeholderStyle={{ color: Color.darkGray, paddingLeft: 2 }}
                placeholderIconColor='#007aff'
                style={{ marginVertical: 15, width: undefined, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                onValueChange={this.onValueChange}
              >
                <Picker.Item label='Barang dikirim' value='dikirim' />
                <Picker.Item label='Barang diantar' value='diantar' />
              </Picker>
              <FormSectionTitle text='Barang Donasi' />
              <FieldArray
                name='items'
                render={arrayHelpers => (
                  <View>
                    { props.values.items.map((item, index) => (
                      <DonationItem
                        itemId={index}
                        key={`${index}`}
                      />
                    ))}
                    <Button transparent full onPress={() => arrayHelpers.push({ itemType: '', itemName: '', itemQty: 1 })}>
                      <Text style={{ color: Color.red }}>Tambah Barang +</Text>
                    </Button>
                  </View>
                )}
              />
              <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                <CheckBox color='red' style={{ borderRadius: 3 }} />
                <Text style={{ marginLeft: 20 }}>Sembunyikan nama saya (Anonim)</Text>
              </View>
              { props.values.items.length > 0 && <RedButton onPress={props.handleSubmit} text='Lanjutkan' style={{ marginTop: 30 }} /> }
            </View>
          )}
        </Formik>
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
