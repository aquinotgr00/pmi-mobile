import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { CheckBox, Text } from 'native-base'
import { connect } from 'formik'
import Color from 'src/constants/Color'

export const FormCheckBox = connect(function (props) {
  function handleTick () {
    props.formik.setFieldValue(props.name, !props.formik.values[props.name])
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', ...props.style }}>
      <CheckBox
        checked={props.formik.values[props.name]}
        color={Color.red}
        style={{ borderRadius: 3 }}
        onPress={handleTick}
      />
      <TouchableWithoutFeedback onPress={handleTick}>
        <Text style={{ marginLeft: 20, paddingVertical: 10, color: Color.darkGray }}>{props.label}</Text>
      </TouchableWithoutFeedback>
    </View>
  )
})
