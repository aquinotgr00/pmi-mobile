import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Text, Item, Label, Input, Picker, Icon, CheckBox, Button } from 'native-base'
import { Screen } from 'src/components'
import { Formik } from 'formik'
import * as yup from 'yup'

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
		checked: false,
	}

	handleSubmit(values) {
		console.log(values)
	}

	render () {
		return (
			<Screen title={this.state.title} back>
				<Text style={{fontWeight:'600',fontSize:16}}>Informasi Donasi</Text>
				<Formik
					initialValues={{ name: '',email: '',phone: '',amount: 0,transferMethod: '',anonym: false }}
					onSubmit={values => console.log(values)}
					validationSchema={validationSchema}
				>
					{formikProps => (
						<React.Fragment>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>Nama</Label>
								<Input />
							</Item>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>E-mail</Label>
								<Input />
							</Item>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>No Telepon</Label>
								<Input />
							</Item>
							<Item floatingLabel style={{marginLeft:0}}>
								<Label>Besar Donasi (min Rp.10,000)</Label>
								<Input />
							</Item>
							<Picker
								iosIcon={<Icon name='arrow-down' />}
								placeholder='Metode Transfer'
								placeholderStyle={{ fontSize:17, color:'black', paddingLeft:0}}
								placeholderIconColor='#007aff'
								style={{marginTop:10, borderBottomWidth:1,borderBottomColor: 'black', opacity:.6}}
							>
								<Picker.Item label='Transfer Manual' value='key0' />
								<Picker.Item label='Transfer Virtual Akun' value='key1' />
							</Picker>
							<View style={{marginTop:30, flex:1,flexDirection:'row',paddingLeft:0}}>
								<CheckBox checked={this.state.checked} onPress={() => this.setState({checked: !this.state.checked})} color='red' style={{borderRadius:3,left:0}} />
								<Text style={{flex:1,marginLeft:15,fontSize:16,textAlignVertical:'bottom'}}>Sembunyikan Nama Saya (Anonim)</Text>
							</View>
							<Button onPress={() => this.props.navigation.navigate('ManualTransfer')} rounded style={{backgroundColor:'red', marginTop:55}}>
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