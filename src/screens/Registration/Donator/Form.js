import React from 'react'
import { connect } from 'react-redux'
import { DatePicker, Textarea, Item, Label, Input, Text } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import { FormField, FormSectionTitle, FormInput, FormSelect, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { register } from 'src/actions'
import DonatorRegistration from 'src/validators/DonatorRegistration'
import AddressField from 'src/components/AddressField'
import { emailValidationApi } from 'src/services/api'
import Config from 'react-native-config'

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

  handleEmailBlur = async (val, formik) => {
    let error
    try {
      const response = await emailValidationApi({email: val})
      const { status, data } = response.data
      if (status === 'success') {
        if (data === null) {
          this.setState({registered:false})
          formik.setStatus({email:undefined})
        }
        if (data.donator !== null) {
          this.setState({registered:false})
          error = 'Email sudah terdaftar sebagai donatur.'
          formik.setStatus({email: error})
        }
        else if (data.volunteer !== null) {
          this.setState({registered:true})
          formik.setFieldValue('password', 'password')
          formik.setFieldValue('password_confirmation', 'password')
          formik.setStatus({email:undefined})
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
      gender: '',
      address: 'Jalan Pelepah Kuning 2 Blok WV 2/11',
      province: 'DKI JAKARTA',
      city: '',
      subdistrict: '',
      subdivision: '',
      postal_code: '',
      password: 'Open1234',
      password_confirmation: 'Open1234',
      password_placeholder: 'Password sama dengan akun relawan.',
    }

    return (
      <Screen title='Daftar Sebagai Donatur' back>
        <Formik
          initialValues={Config.IS_PRODUCTION === '0' ? dummyData:{}}
          initialStatus={{email: undefined}}
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
                onBlur={() => {
                  this.handleEmailBlur(props.values.email, props)
                }}
              />
              {props.status.email !== undefined ?
                <Text style={{fontSize: 10, color: Color.red}}>{props.status.email}</Text>
              :null}
              <FormField label='Nomor HP' name='phone' keyboardType='phone-pad' />
              {this.state.registered
              ? (
                <>
                <Item floatingLabel style={{marginTop: 14}} >
                  <Label>Password</Label>
                  <Input name='password_placeholder' disabled />
                </Item>
                </>
              ) : (
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

              <FormSelect
                placeholder='Gender'
                style={{marginVertical: 4}}
                options={[
                  { value: 'male', label: 'Pria' },
                  { value: 'female', label: 'Wanita' }
                ]}
                name='gender'
              />

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

              <RedButton
                disabled={props.status.email !== undefined}
                text='Simpan'
                onPress={props.handleSubmit}
                style={{ marginTop: 30, marginBottom: 55 }}
              />
            </>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(DonatorRegistrationFormScreen)
