import React from 'react'
import { Screen, IconInu } from 'src/components'
import ImagePicker from 'react-native-image-picker'
import { register } from 'src/actions'
import { connect } from 'react-redux'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Wizard from './Wizard'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'

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
    this.showAlertPopup = this.showAlertPopup.bind(this)
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

    try {
      await this.props.dispatch(register(values, true))
      actions.setSubmitting(false)
      if (this.props.user.token === undefined) {
        console.log('there is a error')
        this.showAlertPopup('Gagal daftar relawan, server sedang error.')
      }
    } catch (err) {
      this.showAlertPopup('Gagal daftar relawan, server sedang error.')
      console.log(err.response)
    }
  }
  
  showAlertPopup = message => {
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_SHORT,
    })
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
  }

  render() {
    return (
      <Screen title='Daftar Sebagai Relawan' back>

				<Wizard
          initialValues={Config.IS_PRODUCTION === '0'
          ? {
						parentMember: '',
						subMember: '',
						name: 'Volu One',
						city: '',
						unitCity: '',
						unit_id: '',
						specialization: 'menggambar',
						skill: 'menggambar',
						email: 'r1@mail.com',
						phone: '0811',
						password: 'Open1234',
            password_confirmation: 'Open1234',
            password_placeholder: 'Password sama dengan akun donatur.',
						birthplace: 'jakarta',
						dob: '',
						gender: 'male',
						religion: 'Islam',
						province: 'DKI JAKARTA',
						subdistrict: '',
						subdivision: '',
						postal_code: '',
						blood_type: 'O',
						address: 'jalan betawi rt 5',
					} : {
            dob: '',
            province: 'DKI JAKARTA',
          }}
					onSubmit={this.handleFormSubmit}
				>
					<Step1 />
					<Step2 />
					<Step3
						photo={this.state.photo}
						loading={this.state.loading}
						handleChoosePhoto={this.handleChoosePhoto}
					/>
				</Wizard>

      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(VolunteerRegistrationFormScreen)