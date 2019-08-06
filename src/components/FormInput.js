import React from 'react'
import { Input } from 'native-base'
import { connect } from 'formik'

export const FormInput = connect(function (props) {
  return (
    <Input
      {...props}
      onChangeText={props.formik.handleChange(props.name)}
      onBlur={props.formik.handleBlur(props.name)}
      value={props.formik.values[props.name]}
    />
  )
})
