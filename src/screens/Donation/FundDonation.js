import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text } from 'native-base'
import { RedButton, Screen, FormField, FormSelect, FormCheckBox } from 'src/components'
import { Formik } from 'formik'
import * as yup from 'yup'
import { getCampaignDetail, storeFundDonation } from 'src/services/api'
import CampaignPicker from 'src/screens/Donation/CampaignPicker'

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required(),
	email: yup
		.string()
		.email()
		.required(),
	phone: yup
		.string()
		.required(),
	amount: yup
		.number()
		.required(),
})

export default class FundDonationScreen extends React.Component {
	state = {
		title: 'Berdonasi Uang',
		id: this.props.navigation.getParam('id'),
	}

	constructor (props) {
		super(props)

		this.getCampaignDetail = this.getCampaignDetail.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount () {
		// this.getCampaignDetail()
	}

	async getCampaignDetail () {
		const response = await getCampaignDetail(this.state.id)
		const { status } = response.data
		if (status === 'success') {
			// no need category
			const { category } = response.data.data
			this.setState({ category })
		}
	}

	handleSubmit = async values => {
		values.category = 1
		console.log(values)
		try {
			const response = await storeFundDonation(values)
			const { status, data } = response.data
			if (status === 'success') {
				if (values.payment_method === 'manual') {
					const { id } = data.donation
					this.props.navigation.navigate('ManualTransfer', {id})
				} else {
					const { donation } = data
					this.props.navigation.navigate('Checkout', {donation})
				}
				
			}
			else {
				// TODO : handle error
			}
			
		} catch (error) {
			// TODO : handle error
			console.log(error.response)
		}
	}

	render () {
		return (
			<Screen title={this.state.title} back>
				<Text style={{fontWeight:'600',fontSize:16}}>Informasi Donasi</Text>
				<Formik
					initialValues={{
						name: 'Test Test',
						email: 'test@mail.com',
						phone: '081',
						amount: '10000',
						payment_method: 'manual',
						campaign_id: this.state.id,
						category: 1,
						anonym: false,
					}}
					onSubmit={this.handleSubmit}
					validationSchema={validationSchema}
				>
					{formikProps => (
						<React.Fragment>
							<CampaignPicker
								type={this.props.navigation.getParam('type_id')}
								fundraising={true}
								enabled={!this.state.id}
							/>

							<FormField label='Nama' name='name' floatingLabel />
							<Text style={{ color: 'red' }}>{formikProps.errors.name}</Text>

							<FormField label='E-mail' name='email' floatingLabel />
							<Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>

							<FormField label='No Telepon' name='phone' floatingLabel />
							<Text style={{ color: 'red' }}>{formikProps.errors.phone}</Text>

							<FormField label='Besar Donasi (min Rp.10,000)' name='amount' floatingLabel />
							<Text style={{ color: 'red' }}>{formikProps.errors.amount}</Text>

							<FormField label='Metode Transfer' name='payment_method' floatingLabel>
								<FormSelect
									name='payment_method'
									options={[
										{ value: 'manual', label: 'Transfer Manual' },
										{ value: 'midtrans', label: 'Transfer Virtual Akun' },
									]}
								/>
							</FormField>

							<FormCheckBox
                label='Sembunyikan nama saya (Anonim)'
                style={{ marginTop: 10 }}
                name='anonym'
              />

							{formikProps.isSubmitting ? (
								<ActivityIndicator style={{marginTop:40}} />
							) : (
								<RedButton
                  onPress={formikProps.handleSubmit}
                  text='Lanjutkan'
                  style={{ marginTop: 55, marginBottom: 55 }}
                  disabled={formikProps.isSubmitting}
                />
							)}
						</React.Fragment>
					)}
				</Formik>
			</Screen>
		)
	}
}