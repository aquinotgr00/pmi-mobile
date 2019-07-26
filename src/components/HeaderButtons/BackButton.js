import React from 'react'
import { withNavigation } from 'react-navigation'
import { Button } from 'native-base'
import { IconInu } from 'src/components'

export const BackButton = withNavigation(function (props) {
  return (
    <Button transparent onPress={() => { props.navigation.goBack() }}>
      <IconInu name='icon-pmi-back' />
    </Button>
  )
})
