import React from 'react'
import { Item, Label } from 'native-base'

export function FormField (props) {
  return (
    <Item>
      <Label>{props.label}</Label>
      {props.children}
    </Item>
  )
}
