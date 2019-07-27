import React from 'react'
import { Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'native-base'

export const MenuButton = withNavigation(function (props) {
  return (
    <Button transparent onPress={() => { props.navigation.openDrawer() }}>
      <Text style={{ fontFamily: 'fontello', fontSize: 26 }}></Text>
    </Button>
  )
})
