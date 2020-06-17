import React from 'react'
import { Button, Icon } from 'native-base'
import { withNavigation } from 'react-navigation'

export default withNavigation(function AddRsvpButton (props) {
  return (
    <Button style={{ backgroundColor: 'transparent' }} onPress={() => props.navigation.navigate('Rsvp')}>
      <Icon type='Entypo' name='plus' style={{ color: '#000', marginLeft: 0, marginRight: 0 }} />
    </Button>
  )
})
