import React from 'react'
import { connect, getIn } from 'formik'
import { Icon, Item, Label } from 'native-base'

export const FormField = connect(function (props) {
  const { name, formik, stackedLabel, style } = props
  const { errors } = formik
  const error = getIn(errors, name)
  return (
    <Item stackedLabel={stackedLabel} error={typeof error === 'string'} style={style}>
      <Label>{props.label}</Label>
      {props.children}
      {typeof error === 'string' && <Icon name='alert' />}
    </Item>
  )
})