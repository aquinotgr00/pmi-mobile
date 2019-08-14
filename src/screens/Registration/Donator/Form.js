import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { DatePicker, Textarea } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import { FormField, FormInput, FormSectionTitle, FormSelect, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { cities } from 'assets/jsons/cities.json'
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
    console.log(user)
    this.props.dispatch(registerDonator(user))
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DonatorNavigator' })], 0)
  }

  onValueChange (value) {
    this.setState({
      selected: value
    })
  }

  render () {
    const dummyData = {
      name: 'Donatur Satu',
      email: 'don1@mail.com',
      phone: '081',
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
    }

    return (
      <Screen title='Daftar Sebagai Donatur' back>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            dob: '',
            address: '',
            province: '',
            city: '',
            subdistrict: '',
            subdivision: '',
            postal_code: '',
            gender: ''
          }}
          onSubmit={values => this.handleFormSubmit(values)}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <FormSectionTitle text='Data Diri' />
              <FormField label='Nama' name='name'>
                <FormInput autoCapitalize='words' name='name' />
              </FormField>
              <FormField label='Email' name='email'>
                <FormInput
                  keyboardType='email-address'
                  autoCapitalize='none'
                  name='email'
                />
              </FormField>
              <FormField label='Nomor HP' name='phone'>
                <FormInput keyboardType='phone-pad' name='phone' />
              </FormField>
              <FormField label='Password' name='password'>
                <FormInput secureTextEntry name='password' />
              </FormField>
              <FormField label='Konfirmasi Password' name='password_confirmation'>
                <FormInput secureTextEntry name='password_confirmation' />
              </FormField>

              <FormField label='Tanggal Lahir' name='dob'>
                <DatePicker
                  defaultDate={new Date()}
                  maximumDate={new Date()}
                  animationType='fade'
                  textStyle={{ color: Color.black, marginVertical: 5 }}
                  onDateChange={date => props.setFieldValue('dob', moment(date).format('YYYY-MM-DD'))}
                  formatChosenDate={date => moment(date).format('DD MMM YYYY')}
                />
              </FormField>

              <FormField label='Jenis Kelamin' name='gender'>
                <FormSelect
                  style={{ width: undefined, marginVertical: 4 }}
                  options={[
                    { value: 'male', label: 'Pria' },
                    { value: 'female', label: 'Wanita' }
                  ]}
                  name='gender'
                />
              </FormField>

              <FormSectionTitle text='Tempat Tinggal' style={{ marginVertical: 20 }} />
              <FormField label='Alamat' name='address' style={{ borderBottomWidth: 0 }} />
              <Textarea
                rowSpan={3}
                onChangeText={props.handleChange('address')}
                onBlur={props.handleBlur('address')}
                value={props.values.address}
                autoCapitalize='none'
                style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                autoCompleteType='off'
              />

              <FormField label='Kelurahan' name='subdivision'>
                <FormInput name='subdivision' />
              </FormField>
              <FormField label='Kecamatan' name='subdistrict'>
                <FormInput name='subdistrict' />
              </FormField>
              <FormField label='Kota' name='city'>
                <FormSelect
                  style={{ width: undefined, marginVertical: 4 }}
                  options={cities}
                  name='city'
                />
              </FormField>
              <FormField label='Propinsi'>
                <FormInput disabled name='province' />
              </FormField>

              <FormField label='Kode Pos' name='postal_code'>
                <FormInput keyboardType='number-pad' name='postal_code' />
              </FormField>

              <RedButton text='Simpan' onPress={props.handleSubmit} style={{ marginTop: 30 }} />
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(DonatorRegistrationFormScreen)
