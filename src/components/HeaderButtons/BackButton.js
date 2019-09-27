import React from 'react'
import { withNavigation } from 'react-navigation'
import { Button } from 'native-base'
import { IconInu } from 'src/components'

export const BackButton = withNavigation(function (props) {
  const style = props.shadow ? {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2 } : {}
  return (
    <Button transparent onPress={() => { props.navigation.goBack() }} style={style}>
      <IconInu {...props} name='icon-pmi-back' />
    </Button>
  )
})
