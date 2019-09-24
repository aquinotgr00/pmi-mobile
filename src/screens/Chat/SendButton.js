import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Color from 'src/constants/Color'

export default function SendButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon name='arrow-circle-up' type='FontAwesome5' style={{ color: Color.red, fontSize: 30 }} />
    </TouchableOpacity>
  )
}
