import React from 'react'
import { FormSelect } from 'src/components'
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
    this.checkInitialValues = this.checkInitialValues.bind(this)
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
    if (this.props.formik.initialValues.city !== undefined && this.props.formik.initialValues.city !== '') {
      this.checkInitialValues()
    }
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

  checkInitialValues () {
    const { city, subdistrict } = this.props.formik.initialValues
    this.setState({
      subdistrictOptions: this.state.subdistrictData[this.props.formik.initialValues.city],
      villageOptions: this.state.villageData[this.props.formik.initialValues.subdistrict]
    })
  }

  render () {
    return (
      <>
        <FormSelect
          style={{marginTop: 4}}
          placeholder='Kabupaten/Kota'
          onChange={this.handleCityChange}
          options={this.state.cityData}
          name='city'
        />

        <FormSelect
          style={{marginTop: 4}}
          placeholder='Kecamatan'
          onChange={this.handleSubdistrictChange}
          options={this.state.subdistrictOptions}
          name='subdistrict'
        />

        <FormSelect
          style={{marginTop: 4}}
          placeholder='Kelurahan/Desa'
          options={this.state.villageOptions}
          name='subdivision'
        />
      </>
    )
  }
}

export default connect(AddressField)