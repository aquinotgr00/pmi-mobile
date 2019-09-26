import React from 'react'
import { FormField, FormSelect } from 'src/components'

export function BiodataForm (props) {
	return (
		<>
			<FormField label='Nama' name='name' />
			<FormField label='Email' name='email' disabled />
			<FormField label='Telepon' name='phone' />
      {props.isVolunteer &&
        <FormField label='Tempat Lahir' name='birthplace' />
      }
			<FormField label='Tanggal Lahir' name='dob' />
      <FormSelect name='gender'
        style={{marginTop: 4}}
        options={[
          { value: 'male', label: 'Laki - laki'},
          { value: 'female', label: 'Perempuan'}
        ]}
      />
		</>
	)
}