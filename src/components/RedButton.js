import React from 'react'
import { Button, Text } from 'native-base'
import Color from 'src/constants/Color'

export function RedButton (props) {
  return (
    <Button full rounded {...props} style={{ backgroundColor: Color.red, marginTop: 10, ...props.style }}>
      <Text>{props.text}</Text>
    </Button>
  )
}
