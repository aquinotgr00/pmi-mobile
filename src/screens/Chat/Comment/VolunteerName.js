import React from 'react'
import { Text } from 'native-base'

export default function VolunteerName(props) {
  return (
    <Text style={{fontWeight:'bold'}}>{props.name}</Text>
  )
}
