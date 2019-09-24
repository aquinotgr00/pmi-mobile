import React from 'react'
import { Text } from 'native-base'
import { RedButton, Screen, FormField, FormSelect, FormCheckBox } from 'src/components'
import { Formik } from 'formik'
import { getCampaignDetail, storeFundDonation } from 'src/services/api'
import CampaignPicker from 'src/screens/Donation/CampaignPicker'
import FundDonation from 'src/validators/FundDonation'
import Config from 'react-native-config'

export default class FundDonationScreen extends React.Component {
	constructor (props) {
    super(props)
    this.state = {
      title: 'Berdonasi Uang',
      id: this.props.navigation.getParam('id'),
      loading: false,
    }

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
		try {
      this.setState({loading:true})
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
      this.setState({loading:false})
		} catch (error) {
			console.log(error.response)
		}
	}

	render () {
		return (
      <Screen
        title={this.state.title}
        back
        isLoading={this.state.loading}
      >
				<Text style={{fontWeight:'600',fontSize:16}}>Informasi Donasi</Text>
				<Formik
          initialValues={Config.IS_PRODUCTION === '0'
          ? {
              name: 'Test Test',
              email: 'test@mail.com',
              phone: '081',
              amount: '10000',
              payment_method: 'manual',
              campaign_id: this.state.id,
              category: 1,
              anonym: false,
            }
          : {}}
					onSubmit={this.handleSubmit}
					validationSchema={FundDonation}
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

              <RedButton
                onPress={formikProps.handleSubmit}
                text='Lanjutkan'
                style={{ marginTop: 55, marginBottom: 55 }}
                disabled={formikProps.isSubmitting}
              />
						</React.Fragment>
					)}
				</Formik>
			</Screen>
		)
	}
}