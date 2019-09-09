import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import { withNavigation } from 'react-navigation'

export default withNavigation(function GeneralDiscussion (props) {
  return (
    <TouchableOpacity>
      <Image
        source={{uri: 'https://facebook.github.io/react/logo-og.png'}} 
        style={{width: 280, height: 200}}
      />
    </TouchableOpacity>
    
  )
})
