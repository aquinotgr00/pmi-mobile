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
			<FormField label='Nama' name='name'>
				<FormInput name='name' />
			</FormField>
			<FormField label='E-mail' name='email'>
				<FormInput name='email' />
			</FormField>
			<FormField label='Nomor HP' name='phone'>
				<FormInput name='phone' />
			</FormField>
			<FormField label='Password' name='password'>
				<FormInput type="password" name='password' />
			</FormField>
			<FormField label='Konfirmasi Password' name='password_confirmation'>
				<FormInput type="password" name='password_confirmation' />
			</FormField>
			<FormField label='Tempat Lahir' name='birthplace'>
				<FormInput name='birthplace' />
			</FormField>
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
			<FormField label='Golongan Darah' name='blood_type'>
				<FormInput name='blood_type' />
			</FormField>
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
			<FormField label='Propinsi'>
				<FormInput disabled name='province' />
			</FormField>
			<FormField label='Kecamatan' name='subdistrict'>
				<FormInput name='subdistrict' />
			</FormField>
			<FormField label='Kelurahan/Desa' name='subdivision'>
				<FormInput name='subdivision' />
			</FormField>
			<FormField label='Kabupaten/Kota' name='city'>
				<FormSelect
					style={{ width: undefined, marginVertical: 4 }}
					options={cities}
					name='city'
				/>
			</FormField>
			<FormField label='Kode Pos' name='postal_code'>
				<FormInput keyboardType='number-pad' name='postal_code' />
			</FormField>
		</Wizard.Page>
	)
}

export default Step2