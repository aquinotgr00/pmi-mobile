import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import { Screen, RedButton } from 'src/components'
import { BiodataForm } from './BiodataForm'
import { AddressForm } from './AddressForm'
import { ExperienceForm } from './ExperienceForm'
import { PasswordForm } from './PasswordForm'
import { Formik } from 'formik'
import Color from 'src/constants/Color'
import { updateProfileApi } from 'src/services/api'

export default class UserFormScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			title: this.props.navigation.state.params.title,
			user: this.props.navigation.state.params.user,
			initialValues: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.loadInitialValues = this.loadInitialValues.bind(this)
	}

	componentDidMount () {
		this.loadInitialValues()
	}

	handleSubmit = async values => {
		try {
			values.verified = 1
			const response = await updateProfileApi(this.state.user.id, values)
			const { status } = response.data

			if (status === 'success') {
				this.props.navigation.state.params.loadProfile()
				this.props.navigation.navigate('UserProfile')
			}
		} catch (err) {
			console.log(err.response)
		}
	}

	loadInitialValues = () => {
		switch (this.state.title) {
			case 'Data Diri':
				this.setState(state => ({
					initialValues: {
						name: state.user.name,
						email: state.user.user.email,
						phone: state.user.phone,
						birthplace: state.user.birthplace,
						dob: state.user.dob,
						gender: state.user.gender,
					}
				}))
				break

			case 'Tempat Tinggal':
				this.setState({
					initialValues: {
						province: this.state.user.province,
						city: this.state.user.city,
						subdistrict: this.state.user.subdistrict,
						subdivision: this.state.user.subdivision,
						postal_code: this.state.user.postal_code,
					}
				})
				break

			case 'Pengalaman':
				this.setState({
					initialValues: {
						old_password: ''
					}
				})
				break

		  case 'Password':
				this.setState({
					initialValues: {
						old_password: '',
						password: '',
						password_confirmation: ''
					}
				})
				break
		
			default:
				break
		}
	}

	renderForm = () => {
		switch (this.state.title) {
			case 'Data Diri':
				return <BiodataForm user={this.state.user} />
				break

			case 'Tempat Tinggal':
				return <AddressForm user={this.state.user} />
				break

			case 'Pengalaman':
				return <ExperienceForm user={this.state.user} />
				break

			case 'Password':
				return <PasswordForm />
				break
		
			default:
				break;
		}
	}

	render () {
		return (
			<Screen title={this.state.title} back>
				<Formik
					initialValues={this.state.initialValues}
					onSubmit={this.handleSubmit}
					enableReinitialize
				>
					{props => (
						<>
							{this.renderForm()}

							<RedButton text='Perbaharui' onPress={props.handleSubmit} style={{marginTop: 20, marginBottom: 10}} />
							{this.state.title === 'Password' &&
								<TouchableOpacity>
									<Text style={{color: Color.red, textAlign: 'center'}}>Lupa password?</Text>
								</TouchableOpacity>
							}
						</>
					)}
				</Formik>
			</Screen>
		)
	}
}