import React from 'react'
import { Screen, IconInu } from 'src/components'
import ImagePicker from 'react-native-image-picker'
import { registerVolunteer, logout } from 'src/actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import Wizard from './Wizard'

class VolunteerRegistrationFormScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login/Register Relawan',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-relawan-regist' color={tintColor} />
    ),
  }
  
  constructor (props) {
		super(props)
		
		this.state = {
			loading: false,
			photo: null,
	}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleChoosePhoto = this.handleChoosePhoto.bind(this)
    this.addQualifications = this.addQualifications.bind(this)
  }

  handleFormSubmit = async (values, actions) => {
		let achArr = []
		let idx = 0

		idx = values.achievements !== undefined ? this.addQualifications(achArr, values.achievements, idx, 1) : 0
		idx = values.assignments !== undefined ? this.addQualifications(achArr, values.assignments, idx, 2) : 0
		idx = values.trainings !== undefined ? this.addQualifications(achArr, values.trainings, idx, 3) : 0
		if (achArr.length > 0) {
			values.qualifications = achArr
		}

		if (this.state.photo !== null) {
			values.image = this.state.photo
		}

		this.props.dispatch(registerVolunteer(values))
		this.props.dispatch(logout())
    // this.props.navigation.reset([NavigationActions.navigate({ routeName: 'DonatorNavigator' })], 0)
	}

	addQualifications (listArr, data, idx, category) {
		data.map(item => {
			listArr[idx] = {
				category: category,
				description: item
			}
			idx++
		})
		return idx
	}
	
	handleChoosePhoto = () => {
    this.setState({loading: true})
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response, loading: false })
      }
		})
		console.log(this.state.photo)
  }

  render() {
    return (
      <Screen title='Daftar Sebagai Relawan' back>

				<Wizard
					initialValues={{
						parentMember: 'palang merah remaja',
						subMember: 'mula',
						name: 'Volu One',
						city: 'Jakarta Barat',
						unit: 'SDN 1 JKT',
						specialization: 'menggambar',
						skill: 'menggambar',
						email: 'volu@one.com',
						phone: '0811',
						password: 'open1234',
						password_confirmation: 'open1234',
						birthplace: 'jakarta',
						dob: '2000-01-10',
						gender: 'male',
						religion: 'Islam',
						province: 'JAKARTA',
						subdistrict: 'jakarta barat',
						subdivision: 'desa betawi',
						postal_code: '12344',
						blood_type: 'O',
						address: 'jalan betawi rt 5',
					}}
					onSubmit={this.handleFormSubmit}
				>
					<Step1 />
					<Step2 />
					<Step3 photo={this.state.photo} loading={this.state.loading} handleChoosePhoto={this.handleChoosePhoto} />
				</Wizard>

      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(VolunteerRegistrationFormScreen)