import React from 'react'
import { DatePicker, Textarea } from 'native-base'
import { FormSectionTitle, FormField, FormInput, FormSelect } from 'src/components'
import Wizard from './Wizard'
import cities from 'assets/jsons/cities.json'
import Color from 'src/constants/Color'
import moment from 'moment'

function Step2 (props) {
	console.log(props)
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

			<FormSectionTitle text='Tempat Tinggal' />
			<FormField label='Alamat' name='address' style={{ borderBottomWidth: 0 }} />
			<Textarea
				rowSpan={3}
				autoCapitalize='none'
				style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
				autoCompleteType='off'
				name='address'
			/>
			<FormField label='Propinsi' disabled />
			<FormField label='Kecamatan' name='subdistrict' />
			<FormField label='Kelurahan/Desa' name='subdivision' />
			<FormField label='Kabupaten/Kota' name='city'>
				<FormSelect
					style={{ width: undefined, marginVertical: 4 }}
					options={cities}
					name='city'
				/>
			</FormField>
			<FormField label='Kode Pos' name='postal_code' keyboardType='number-pad' name='postal_code' />
		</Wizard.Page>
	)
}

export default Step2