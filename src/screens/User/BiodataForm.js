import React from 'react'
import { FormField, FormSelect } from 'src/components'

export function BiodataForm (props) {
	return (
		<>
			<FormField label='Nama' name='name' />
			<FormField label='Email' name='email' disabled />
			<FormField label='Telepon' name='phone' />
			<FormField label='Tempat Lahir' name='birthplace' />
			<FormField label='Tanggal Lahir' name='dob' />
			<FormField label='Gender' name='gender'>
				<FormSelect name='gender'
					options={[
						{ value: 'male', label: 'Laki - laki'},
						{ value: 'female', label: 'Perempuan'}
					]}
				/>
			</FormField>
		</>
	)
}