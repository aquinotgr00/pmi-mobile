import React from 'react'
import { DatePicker, Textarea } from 'native-base'
import { FormSectionTitle, FormField, FormInput, FormSelect } from 'src/components'
import Wizard from './Wizard'
import Color from 'src/constants/Color'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'formik'

class Step2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cityData: [],
      cityValue: '',
      subdistrictData: [],
      subdistrictOptions: [],
      subdistrictValue: '',
      villageData: [],
      villageOptions: [],
      villageValue: '',
      postalCodes: [],
      postalCodeValue: '',
    }

    this.getCityData = this.getCityData.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  componentDidMount () {
    this.getCityData()
  }

  getCityData = async () => {
    const cityResponse = await AsyncStorage.getItem('cities_data')
    const cityParsed = JSON.parse(cityResponse)
    const cityData = []
    const subdistrictData = []
    const villageData = []
    const postalCodes = []
    cityParsed.filter(city => {
      postalCodes[city.name] = city.postal_code
      cityData.push({
        label: city.name,
        value: city.name,
      })
      subdistrictData[city.name] = []
      city.subdistricts.filter(subdistrict => {
        subdistrictData[city.name].push({
          label: subdistrict.name,
          value: subdistrict.name
        })
        villageData[subdistrict.name] = []
        subdistrict.villages.filter(village => {
          villageData[subdistrict.name].push({
            label: village.name,
            value: village.name,
          })
        })
      })
    })
    this.setState({ cityData, subdistrictData, villageData, postalCodes })
  }

  handleOptionChange (value, which) {
    switch (which) {
      case 'city':
        this.setState({
          cityValue: value,
          subdistrictOptions: this.state.subdistrictData[value],
          villageOptions: [],
          postalCodeValue: this.state.postalCodes[value]
        })
        break

      case 'subdistrict':
        this.setState({ subdistrictValue: value, villageOptions: this.state.villageData[value] })
        break
    
      default:
        break
    }
  }

  render () {
    const { setFieldValue, errors } = this.props.formik
    console.log(errors)
    return (
      <Wizard.Page>
        <FormSectionTitle text='Data Diri' />
        <FormField label='Nama' name='name' autoCapitalize='words' />
        <FormField label='E-mail' name='email' keyboardType='email-address' />
        <FormField label='Nomor HP' name='phone' keyboardType='phone-pad' />
        <FormField label='Password' name='password' secureTextEntry />
        <FormField label='Konfirmasi Password' name='password_confirmation' secureTextEntry />
        <FormField label='Tempat Lahir' name='birthplace' />
        <FormField label='Tanggal Lahir' name='dob'>
          <DatePicker
            defaultDate={new Date()}
            maximumDate={new Date()}
            animationType='fade'
            textStyle={{ color: Color.black, marginVertical: 5 }}
            // onDateChange={date => props.setFieldValue('dob', moment(date).format('YYYY-MM-DD'))}
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
        <FormField label='Golongan Darah' name='blood_type' />
        <FormField label='Agama' name='religion'>
          <FormSelect
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
        </FormField>

        <FormSectionTitle text='Tempat Tinggal' style={{marginTop: 40}} />
        <FormField label='Alamat' name='address' style={{ borderBottomWidth: 0 }} />
        {/* <Textarea
          rowSpan={3}
          autoCapitalize='none'
          style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
          autoCompleteType='off'
          name='address'
        /> */}
        <FormField label='Propinsi' name='province'>
          <FormInput name='province' disabled />
        </FormField>
        <FormField label='Kabupaten/Kota' name='city'>
          <FormSelect
            onChange={val => {
              setFieldValue('city', val)
              this.setState({
                subdistrictOptions: this.state.subdistrictData[val],
                villageOptions: [],
                postalCodeValue: this.state.postalCodes[val],
              })
              setFieldValue('postal_code', this.state.postalCodes[val])
            }}
            iconName={errors.city ? 'alert':'arrow-down'}
            options={this.state.cityData}
            name='city'
          />
        </FormField>
        <FormField label='Kecamatan' name='subdistrict'>
          <FormSelect
            onChange={val => {
              setFieldValue('subdistrict', val)
              this.setState({ villageOptions: this.state.villageData[val] })
            }}
            iconName={errors.subdistrict ? 'alert':'arrow-down'}
            options={this.state.subdistrictOptions}
            name='subdistrict'
          />
        </FormField>
        <FormField label='Kelurahan/Desa' name='subdivision'>
          <FormSelect
            iconName={errors.subdivision ? 'alert':'arrow-down'}
            options={this.state.villageOptions}
            name='subdivision'
          />
        </FormField>
        <FormField label='Kode Pos' name='postal_code' keyboardType='number-pad'>
          <FormInput name='postal_code' value={this.state.postalCodeValue} />
        </FormField>
      </Wizard.Page>
    )
  }
}

export default connect(Step2)