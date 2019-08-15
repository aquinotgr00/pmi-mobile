import React from 'react'
import { Icon, Picker } from 'native-base'
import { connect } from 'formik'
import Color from 'src/constants/Color'

export const FormSelect = connect(function (props) {
  const { formik, name, options, placeholder, style, onChange } = props
  const { handleChange, values } = formik
  return (
    <Picker
      enabled={props.enabled}
      mode='dropdown'
      iosIcon={<Icon name='arrow-down' style={{ color: Color.red }} />}
      placeholder={placeholder}
      placeholderStyle={{ color: Color.darkGray, paddingLeft: 2 }}
      style={style}
      onValueChange={onChange || handleChange(name)}
      selectedValue={values[name]}
    >
      {options.map((option, index) =>
        <Picker.Item label={option.label} value={option.value} key={`${index}`} />
      )}
    </Picker>
  )
})
