import React from 'react'
import { connect } from 'react-redux'
import { DatePicker, Textarea } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import { FormField, FormSectionTitle, FormInput, FormSelect, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { register } from 'src/actions'
import DonatorRegistration from 'src/validators/DonatorRegistration'
import AddressField from 'src/components/AddressField'
import { emailValidationApi } from 'src/services/api'

class DonatorRegistrationFormScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registered: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleEmailBlur = this.handleEmailBlur.bind(this)
  }

  async handleFormSubmit (user) {
    try {
      await this.props.dispatch(register(user))
    } catch (err) {
      console.log(err.response)
    }
  }

  handleEmailBlur = async (e) => {
    try {
      const response = await emailValidationApi({email: e.nativeEvent.text})
      const { status, data } = response.data
      if (status === 'success') {
        if (data.donator === null || data.volunteer === null) {
          if (data.donator !== null) {
            console.log('this email has been used to register donator before.')
          }
          if (data.volunteer !== null) {
            // remove password field
            this.setState({registered:true})
            console.log('there is a volunteer account assosiated with this email address.')
          }
        } else {
          console.log('this acount is fully assosiated with volunteer and donator.')
        }
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  render () {
    const dummyData = {
      name: 'Ini Donator 8',
      email: 'don88@mail.com',
      phone: '0819282',
      dob: '2000-01-10',
      gender: 'male',
      address: 'Jalan Pelepah Kuning 2 Blok WV 2/11',
      province: 'DKI JAKARTA',
      city: '',
      subdistrict: '',
      subdivision: '',
      postal_code: '',
    }

    return (
      <Screen title='Daftar Sebagai Donatur' back>
        <Formik
          initialValues={dummyData}
          onSubmit={values => this.handleFormSubmit(values)}
          validationSchema={DonatorRegistration}
        >
          {props => (
            <>
              <FormSectionTitle text='Data Diri' style={{marginTop: 0}} />
              <FormField label='Nama' name='name' autoCapitalize='words' />
              <FormField
                label='Email'
                name='email'
                keyboardType='email-address'
                autoCapitalize='none'
                onBlur={this.handleEmailBlur}
              />
              <FormField label='Nomor HP' name='phone' keyboardType='phone-pad' />
              {!this.state.registered && (
                <>
                <FormField label='Password' name='password' secureTextEntry />
                <FormField label='Konfirmasi Password' name='password_confirmation' secureTextEntry />
                </>
              )}
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

              <FormSectionTitle text='Tempat Tinggal' />
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

              <FormField label='Propinsi' name='province'>
                <FormInput name='province' disabled />
              </FormField>

              <AddressField />

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
