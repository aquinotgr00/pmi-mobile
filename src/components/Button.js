import React from 'react'
import { Button as ButtonBase, Text } from 'native-base'
import Theme from 'src/constants/Theme'

export default function Button (props) {
  return (
    <ButtonBase {...props} style={{ color: Theme.color.red }}>
      <Text>{props.text}</Text>
    </ButtonBase>
  )
}
