import React from 'react'
import { DatePicker, Textarea, Item, Label, Input, Text } from 'native-base'
import { FormSectionTitle, FormField, FormSelect, FormInput } from 'src/components'
import Wizard from './Wizard'
import Color from 'src/constants/Color'
import moment from 'moment'
import { connect } from 'formik'
import AddressField from 'src/components/AddressField'
import { emailValidationApi } from 'src/services/api'

class Step2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registered: false
    }

    this.handleEmailBlur = this.handleEmailBlur.bind(this)
  }
  
  handleEmailBlur = async (e) => {
    let error
    try {
      const response = await emailValidationApi({email: e.nativeEvent.text})
      const { status, data } = response.data
      if (status === 'success') {
        if (data === null) {
          this.setState({registered:false})
          this.props.formik.setStatus({email:undefined})
        }
        if (data.volunteer !== null) {
          this.setState({registered:false})
          error = 'Email sudah terdaftar sebagai relawan.'
          this.props.formik.setStatus({email: error})
        }
        else if (data.donator !== null) {
          this.setState({registered:true})
          this.props.formik.setFieldValue('password', 'password')
          this.props.formik.setFieldValue('password_confirmation', 'password')
          this.props.formik.setStatus({email:undefined})
        }
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  render () {
    return (
      <Wizard.Page>
        <FormSectionTitle text='Data Diri' style={{marginTop: 0}} />
        <FormField label='Nama' name='name' autoCapitalize='words' />
        <FormField
          label='E-mail'
          name='email'
          keyboardType='email-address'
          autoCapitalize='none'
          onBlur={this.handleEmailBlur}
        />
        {this.props.formik.status.email !== undefined ?
          <Text style={{fontSize: 10, color: Color.red}}>{this.props.formik.status.email}</Text>
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
        <FormField label='Tempat Lahir' name='birthplace' />
        <FormField label='Tanggal Lahir' name='dob'>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1980, 1, 1)}
            maximumDate={new Date()}
            animationType='fade'
            textStyle={{ color: Color.black, marginVertical: 5 }}
            formatChosenDate={date => moment(date).format('DD MMM YYYY')}
            onDateChange={val => {
              const valDob = moment(val).format('Y-M-D')
              this.props.formik.setFieldValue('dob', valDob)
            }}
            name='dob'
          />
        </FormField>
        <FormSelect
          placeholder='Gender'
          style={{ width: undefined, marginVertical: 4 }}
          options={[
            { value: 'male', label: 'Pria' },
            { value: 'female', label: 'Wanita' }
          ]}
          name='gender'
        />
        <FormField label='Golongan Darah' name='blood_type' />
        <FormSelect
          placeholder='Agama'
          style={{ width: undefined, marginVertical: 4 }}
          options={[
            { value: 'Islam', label: 'Islam' },
            { value: 'Kristen', label: 'Kristen' },
            { value: 'Khatolik', label: 'Khatolik' },
            { value: 'Buddha', label: 'Buddha' },
            { value: 'Hindhu', label: 'Hindhu' },
            { value: 'Konghuchu', label: 'Konhuchu' },
          ]}
          name='religion'
        />

        <FormSectionTitle text='Tempat Tinggal' />
        <FormField nofloat onlyLabel='Alamat' name='address' style={{ borderBottomWidth: 0 }} />
        <Textarea
          rowSpan={3}
          autoCapitalize='none'
          style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
          autoCompleteType='off'
          onChange={val => this.props.formik.setFieldValue('address', val)}
          name='address'
        />

        <FormField label='Propinsi' name='province'>
          <FormInput name='province' placeholder='DKI JAKARTA' disabled />
        </FormField>

        <AddressField />

        <FormField label='Kode Pos' name='postal_code' keyboardType='number-pad' />

      </Wizard.Page>
    )
  }
}

export default connect(Step2)