import React from 'react'
import { Text } from 'native-base'
export function FormSectionTitle (props) {
  return (
    <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 8 }}>{props.text}</Text>
  )
}
