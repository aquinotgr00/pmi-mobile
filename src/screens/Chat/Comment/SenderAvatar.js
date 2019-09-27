import React from 'react'
import { Thumbnail } from 'native-base'
import Image from 'src/constants/Image'

export default function SenderAvatar(props) {
  const { uri } = props
  const imageSource = uri? { uri }:Image.DefaultAvatar
  return (
    <Thumbnail small source={imageSource} />
  )
}
