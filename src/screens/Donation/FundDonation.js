import React from 'react'
import { View, Alert, ActivityIndicator } from 'react-native'
import { Text, Item, Label, Input, Picker, Icon, CheckBox, Button } from 'native-base'
import { Screen } from 'src/components'
import { Formik } from 'formik'
import * as yup from 'yup'
import { getCampaignDetail, storeFundDonation } from 'src/services/api'

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required(),
	email: yup
		.string()
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
		id: this.props.navigation.state.params.id,
		category: 1,
		checked: false,
	}

	constructor (props) {
		super(props)

		this.getCampaignDetail = this.getCampaignDetail.bind(this)
		// this.handleSubmit = this.handleSubmit.bind(this)
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
		try {
			if (values.payment_method === 'manual') {
				const response = await storeFundDonation(values)
				const { status, data } = response.data
				if (status === 'success') {
					const { id } = data.donation
					this.props.navigation.navigate('ManualTransfer', {id})
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	render () {
		return (
			<Screen title={this.state.title} back>
				<Text style={{fontWeight:'600',fontSize:16}}>Informasi Donasi</Text>
				<Formik
					initialValues={{ name: '',email: '',phone: '',amount: '', payment_method: '', campaign_id: this.state.id, category: 1 }}
					onSubmit={this.handleSubmit}
					validationSchema={validationSchema}
				>
					{formikProps => (
						<React.Fragment>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>Nama</Label>
								<Input onChangeText={formikProps.handleChange('name')} />
							</Item>
							<Text style={{ color: 'red' }}>{formikProps.errors.name}</Text>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>E-mail</Label>
								<Input onChangeText={formikProps.handleChange('email')} />
							</Item>
							<Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>No Telepon</Label>
								<Input onChangeText={formikProps.handleChange('phone')} />
							</Item>
							<Text style={{ color: 'red' }}>{formikProps.errors.phone}</Text>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>Besar Donasi (min Rp.10,000)</Label>
								<Input onChangeText={formikProps.handleChange('amount')} />
							</Item>
							<Text style={{ color: 'red' }}>{formikProps.errors.amount}</Text>
							<Picker
								iosIcon={<Icon name='arrow-down' />}
								placeholder='Metode Transfer'
								placeholderStyle={{ fontSize:17, color:'black', paddingLeft:0}}
								placeholderIconColor='#007aff'
								onValueChange={formikProps.handleChange('payment_method')}
								style={{marginTop:10, borderBottomWidth:1,borderBottomColor: 'black', opacity:.6}}
							>
								<Picker.Item label='Transfer Manual' value='manual' />
								<Picker.Item label='Transfer Virtual Akun' value='midtrans' />
							</Picker>
							<View style={{marginTop:30, flex:1,flexDirection:'row',paddingLeft:0}}>
								<CheckBox checked={this.state.checked} onPress={() => this.setState({checked: !this.state.checked})} color='red' style={{borderRadius:3,left:0}} />
								<Text style={{flex:1,marginLeft:15,fontSize:16,textAlignVertical:'bottom'}}>Sembunyikan Nama Saya (Anonim)</Text>
							</View>
							<Button onPress={formikProps.handleSubmit} rounded style={{backgroundColor:'red', marginTop:55}}>
								<View style={{width:'100%',borderRadius:50}}>
									<Text style={{textAlign:'center',fontSize:18,fontWeight:'600'}}>Lanjutkan</Text>
								</View>
							</Button>
						</React.Fragment>
					)}
				</Formik>
			</Screen>
		)
	}
}