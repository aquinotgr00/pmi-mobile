import React from 'react'
import { Icon, Picker } from 'native-base'
import { connect } from 'formik'
import Color from 'src/constants/Color'

export const FormSelect = connect(function (props) {
  return (
    <Picker
      mode='dropdown'
      iosIcon={<Icon name='arrow-down' />}
      placeholder={props.placeholder}
      placeholderStyle={{ color: Color.darkGray, paddingLeft: 2 }}
      placeholderIconColor='#007aff'
      style={props.style}
      onValueChange={props.formik.handleChange(props.name)}
      selectedValue={props.formik.values[props.name]}
    >
      {props.options.map((option, index) =>
        <Picker.Item label={option.label} value={option.value} key={`${index}`} />
      )}
    </Picker>
  )
})
