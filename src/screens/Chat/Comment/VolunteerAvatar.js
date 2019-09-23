import React from 'react'
import { Thumbnail } from 'native-base'

export default function VolunteerAvatar(props) {
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png'
  return (
    <Thumbnail small source={{uri}} />
  )
}
