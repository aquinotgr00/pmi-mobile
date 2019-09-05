import React from 'react'
import { FormField, FormSelect } from 'src/components'

export function ExperienceForm (props) {
	handleSubmit = (values) => {
		console.log(values)
	}

	return (
		<>
			<FormField label='Password Sekarang' name='old_password' />
		</>
	)
}