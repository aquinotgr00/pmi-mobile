import React from 'react'
import { FormField, FormInput } from 'src/components'
import AddressField from 'src/components/AddressField'
import { connect } from 'formik'

function AddressForm (props) {
  console.log(props)

	return (
		<>
      <FormField label='Propinsi' name='province'>
        <FormInput name='province' disabled />
      </FormField>

      <AddressField />

      <FormField label='Kode Pos' name='postal_code' keyboardType='number-pad' />
		</>
	)
}

export default connect(AddressForm)