import React from 'react'
import { Icon, Picker, Text } from 'native-base'
import { connect, getIn } from 'formik'
import Color from 'src/constants/Color'

export const FormSelect = connect(function (props) {
  const { formik, name, options, placeholder, placeholderStyle, iconName, style, onChange, selectedValue } = props
  const { handleChange, values } = formik
  const { errors } = formik
  const error = getIn(errors, name)

  return (
    <>
    <Picker
      enabled={props.enabled}
      mode='dropdown'
      iosIcon={
        <Icon name={iconName || 'arrow-down'} style={{ color: Color.red }} />
      }
      placeholder={placeholder}
      placeholderStyle={[{ color: Color.darkGray, paddingLeft: 2 }, placeholderStyle]}
      style={style}
      onValueChange={onChange || handleChange(name)}
      selectedValue={selectedValue || values[name]}
      error={typeof error === 'string'}
    >
      {options.map((option, index) =>
        <Picker.Item label={option.label} value={option.value} key={`${index}`} />
      )}
    </Picker>
    {typeof error === 'string' && <Text style={{ fontSize: 10, color: 'red' }}>{error}</Text>}
    </>
  )
})
