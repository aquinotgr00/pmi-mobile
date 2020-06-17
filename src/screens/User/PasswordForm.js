import React from 'react'
import { FormField } from 'src/components'

export function PasswordForm (props) {
	handleSubmit = (values) => {
		console.log(values)
	}

	return (
		<>
			<FormField label='Password Sekarang' name='old_password' />
			<FormField label='Masukan Password Baru' name='password' />
			<FormField label='Ulangi Password Baru' name='password_confirmation' />
		</>
	)
}