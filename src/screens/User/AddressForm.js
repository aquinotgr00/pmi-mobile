import React from 'react'
import { FormField, FormSelect } from 'src/components'

export function AddressForm (props) {
	return (
		<>
			<FormField label='Provinsi' name='province' />
			<FormField label='Kota' name='city' />
			<FormField label='Kecamatan' name='subdistrict' />
			<FormField label='Desa' name='subdivision' />
			<FormField label='Kode Pos' name='postal_code' />
		</>
	)
}