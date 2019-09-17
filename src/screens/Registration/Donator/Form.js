import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { DatePicker, Textarea } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import { FormField, FormInput, FormSectionTitle, FormSelect, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import cities from 'assets/jsons/cities.json'
import { register } from 'src/actions'
import * as Yup from "yup"

class DonatorRegistrationFormScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: undefined
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleEmailBlur = this.handleEmailBlur.bind(this)
  }

  async handleFormSubmit (user) {
    try {
      const response = await this.props.dispatch(register(user))
      // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DonatorNavigator' })], 0)
    } catch (err) {
      console.log(err.response)
    }
  }

  onValueChange (value) {
    this.setState({
      selected: value
    })
  }

  handleEmailBlur = e => {
    console.log(e)
  }
  
  loginSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required(),
    dob: Yup.string().required(),
    address: Yup.string().required(),
    province: Yup.string().required(),
    city: Yup.string().required(),
    subdistrict: Yup.string().required(),
    subdivision: Yup.string().required(),
    postal_code: Yup.string().required(),
    gender: Yup.string().required(),
  })

  render () {
    const dummyData = {
      name: 'Ini Donator 8',
      email: 'don88@mail.com',
      phone: '0819282',
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
          initialValues={dummyData}
          onSubmit={values => this.handleFormSubmit(values)}
          validationSchema={this.loginSchema}
        >
          {props => (
            <>
              <FormSectionTitle text='Data Diri' />
              <FormField label='Nama' name='name' autoCapitalize='words' />
              <FormField
                label='Email'
                name='email'
                keyboardType='email-address'
                autoCapitalize='none'
                onBlur={this.handleEmailBlur}
              />
              <FormField label='Nomor HP' name='phone' keyboardType='phone-pad' />
              <FormField label='Password' name='password' secureTextEntry />
              <FormField label='Konfirmasi Password' name='password_confirmation' secureTextEntry />
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

              <FormSectionTitle text='Tempat Tinggal' style={{ marginTop: 20 }} />
              <FormField nofloat onlyLabel='Alamat' name='address' style={{ borderBottomWidth: 0 }} />
              <Textarea
                rowSpan={3}
                onChangeText={props.handleChange('address')}
                onBlur={props.handleBlur('address')}
                value={props.values.address}
                autoCapitalize='none'
                style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                autoCompleteType='off'
              />

              <FormField label='Kelurahan' name='subdivision' />
              <FormField label='Kecamatan' name='subdistrict' />
              <FormField label='Kota' name='city'>
                <FormSelect
                  style={{ width: undefined, marginVertical: 4 }}
                  options={cities}
                  name='city'
                />
              </FormField>
              <FormField label='Propinsi' disabled name='province' />
              <FormField label='Kode Pos' name='postal_code' keyboardType='number-pad' />

              <RedButton text='Simpan' onPress={props.handleSubmit} style={{ marginTop: 30, marginBottom: 55 }} />
            </>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(DonatorRegistrationFormScreen)
