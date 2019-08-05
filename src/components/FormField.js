import React from 'react'
import { View } from 'react-native'
import { Item, Label } from 'native-base'

export function FormField (props) {
  return (
    <View style={{ marginTop: 7 }}>
      <Item floatingLabel>
        <Label>{props.label}</Label>
        {props.children}
      </Item>
    </View>

  )
}
