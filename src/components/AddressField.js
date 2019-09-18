import React from 'react'
import { FormField, FormInput, FormSelect } from 'src/components'
import { connect } from 'formik'
import AsyncStorage from '@react-native-community/async-storage'

class AddressField extends React.Component {
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
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleSubdistrictChange = this.handleSubdistrictChange.bind(this)
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
  
  handleCityChange = val => {
    this.props.formik.setFieldValue('city', val)
    this.setState({
      subdistrictOptions: this.state.subdistrictData[val],
      villageOptions: [],
      postalCodeValue: this.state.postalCodes[val],
    })
    this.props.formik.setFieldValue('postal_code', this.state.postalCodes[val])
  }

  handleSubdistrictChange = val => {
    this.props.formik.setFieldValue('subdistrict', val)
    this.setState({ villageOptions: this.state.villageData[val] })
  }


  render () {
    const { errors } = this.props.formik
    return (
      <>
      <FormField label='Propinsi' name='province'>
        <FormInput name='province' disabled />
      </FormField>

      <FormField label='Kabupaten/Kota' name='city'>
        <FormSelect
          onChange={this.handleCityChange}
          iconName={errors.city ? 'alert':'arrow-down'}
          options={this.state.cityData}
          name='city'
        />
      </FormField>

      <FormField label='Kecamatan' name='subdistrict'>
        <FormSelect
          onChange={this.handleSubdistrictChange}
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
      </>
    )
  }
}

export default connect(AddressField)