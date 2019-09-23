import React from 'react'
import { Text } from 'native-base'

export default function SenderName(props) {
  return (
    <Text style={{fontWeight:'bold'}}>{props.name}</Text>
  )
}
