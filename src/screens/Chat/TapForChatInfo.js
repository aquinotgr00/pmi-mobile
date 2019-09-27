import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, Thumbnail } from 'native-base'
import Color from 'src/constants/Color'

export default withNavigation(function TapForChatInfo (props) {
  const { rsvpId, title, image: uri } = props
  console.log(uri)
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('RsvpDetail', { rsvpId, joinRequest: true })}>
      <View style={{ flexDirection: 'row' }}>
        <Thumbnail small source={{ uri }} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: Color.black }} numberOfLines={1}>{title}</Text>
          <Text style={{ color: Color.lightGray, fontSize: 12 }}>Tap di sini untuk melihat info grup</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})
