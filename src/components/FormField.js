import React from 'react'
import { connect, getIn } from 'formik'
import { Icon, Input, Item, Label } from 'native-base'
import Config from 'react-native-config'
import { FormInput } from './FormInput';

export const FormField = connect(function (props) {
  const { name, formik, nofloat, stackedLabel, style, label, onlyLabel, disabled, value, children } = props
  const useFloatingLabel = Config.IS_PRODUCTION==='1' && !nofloat
  const { errors } = formik
  const error = getIn(errors, name)
  
  if(useFloatingLabel) {
    if(typeof children==='undefined') {
      return (
        <Item
          floatingLabel
          error={typeof error === 'string'} 
          style={[{marginTop:14}, style]}
        >
          <Label>{label}</Label>
          <Input {...props} value={disabled?formik.values[name]:null} />
          {typeof error === 'string' && <Icon name='alert' />}
        </Item>
      )
    }
    else {
      return (
        <Item
          error={typeof error === 'string'} 
          style={style}
        >
          <Label>{label}</Label>
          {children}
          {typeof error === 'string' && <Icon name='alert' />}
        </Item>
      )
    }
  }
  else {
    return (
      <Item
        error={typeof error === 'string'} 
        style={style}
      >
        <Label>{label || onlyLabel }</Label>
        { !onlyLabel && children }
        { !onlyLabel && <FormInput {...props} /> }
        {typeof error === 'string' && <Icon name='alert' />}
      </Item>
    )
  }
  
})
