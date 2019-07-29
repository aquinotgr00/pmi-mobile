import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Icon, Input, Item, Picker, Text, Textarea } from 'native-base'
import { Formik } from 'formik'
import { RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { registerDonator } from 'src/actions'

class DonatorRegistrationFormScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: undefined
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (user) {
    const coba = {
      name: 'Donatur satu',
      email: 'donatur4@mail.com',
      phone: '0804',
      password: 'open1234',
      password_confirmation: 'open1234',
      url_action: 'dummy.frontend.com',
      gender: 'male'
    }
    this.props.dispatch(registerDonator(coba))
    // this.props.dispatch(registerDonator(user))
    // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Main' })], 0)
  }

  onValueChange (value) {
    this.setState({
      selected: value
    })
  }

  render () {
    return (
      <Screen title='Daftar Sebagai Donatur' back>
        <Formik
          initialValues={{
            name: 'Donatur ',
            email: 'donatur@mail.com',
            phone: '08',
            password: 'Open1234',
            password_confirmation: 'Open1234',
            dob: '2000-01-10',
            address: 'Jalan Pelepah Kuning 2 Blok WV 2/11',
            province: 'DKI JAKARTA',
            city: 'Jakarta Utara',
            subdistrict: 'Kelapa Gading',
            subdivision: 'Kelapa',
            postal_code: '12345',
            gender: 'male'
          }}
          onSubmit={values => this.handleFormSubmit(values)}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Data Diri</Text>
              <Item>
                <Input
                  placeholder='Nama'
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Email'
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Nomor HP'
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Konfirmasi Password'
                  secureTextEntry
                  onChangeText={props.handleChange('password_confirmation')}
                  onBlur={props.handleBlur('password_confirmation')}
                  value={props.values.password_confirmation}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Tanggal Lahir'
                  onChangeText={props.handleChange('dob')}
                  onBlur={props.handleBlur('dob')}
                  value={props.values.dob}
                />
              </Item>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                placeholder='Jenis Kelamin'
                placeholderStyle={{ fontSize: 17, color: Color.black, paddingLeft: 10 }}
                placeholderIconColor='#007aff'
                style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label='Pria' value='male' />
                <Picker.Item label='Wanita' value='female' />
              </Picker>
              <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8 }}>Tempat Tinggal</Text>
              <Textarea
                rowSpan={3}
                bordered
                placeholder='Alamat'
                onChangeText={props.handleChange('address')}
                onBlur={props.handleBlur('address')}
                value={props.values.address}
              />
              <Item>
                <Input
                  placeholder='Kelurahan'
                  onChangeText={props.handleChange('subdivision')}
                  onBlur={props.handleBlur('subdivision')}
                  value={props.values.subdivision}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Kecamatan'
                  onChangeText={props.handleChange('subdistrict')}
                  onBlur={props.handleBlur('subdistrict')}
                  value={props.values.subdistrict}
                />
              </Item>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                placeholder='Kabupaten'
                placeholderStyle={{ fontSize: 17, color: Color.black, paddingLeft: 10 }}
                placeholderIconColor='#007aff'
                style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label='Jakarta Pusat' value='male' />
                <Picker.Item label='Jakarta Barat' value='female' />
                <Picker.Item label='Jakarta Timur' value='male' />
                <Picker.Item label='Jakarta Utara' value='female' />
                <Picker.Item label='Jakarta Selatan' value='male' />
                <Picker.Item label='Kepulauan Seribu' value='female' />
              </Picker>
              <Item>
                <Input disabled placeholder='DKI JAKARTA' />
              </Item>
              <Item>
                <Input
                  placeholder='Kode Pos'
                  onChangeText={props.handleChange('postal_code')}
                  onBlur={props.handleBlur('postal_code')}
                  value={props.values.postal_code}
                />
              </Item>
              <RedButton text='Simpan' onPress={props.handleSubmit} style={{ marginTop: 30 }} />
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(DonatorRegistrationFormScreen)
