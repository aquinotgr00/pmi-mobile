import React from 'react'
import { Text } from 'native-base'
import { PixelRatio } from 'react-native'
export function FormSectionTitle (props) {
  return (
    <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8, marginTop: PixelRatio.get()*20, ...props.style }}>{props.text}</Text>
  )
}
