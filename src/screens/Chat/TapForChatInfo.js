import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Text, Thumbnail } from 'native-base'
import Color from 'src/constants/Color'

export default withNavigation(function TapForChatInfo(props) {
  console.log(props.image)
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png'
  return (
    <TouchableOpacity onPress={()=>props.navigation.navigate('ChatInfo')}>
      <View style={{ flexDirection: 'row' }}>
        <Thumbnail small source={{uri:props.image}} />
        <View style={{marginLeft:10}}>
          <Text style={{ color: Color.black }}>{props.title}</Text>
          <Text style={{ color: Color.lightGray, fontSize: 12 }}>Tap di sini untuk melihat info grup</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})
