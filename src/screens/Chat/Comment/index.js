import React from 'react'
import { View } from 'react-native'
import SenderAvatar from './SenderAvatar'
import NameAndTimestamp from './NameAndTimestamp'
import CommentAndAttachment from './CommentAndAttachment'

export default function Comment(props) {
  return (
    <View style={{flexDirection:'row', marginVertical:10, width:'88%'}}>
      <SenderAvatar uri={props.avatar}/>
      <View style={{width:'95%',backgroundColor:'white', borderRadius:15, marginLeft:10, padding:10}}>
        <NameAndTimestamp
          senderName={props.senderName}
          timestamp={props.timestamp}
        />
        <CommentAndAttachment
          text={props.text}
          attachment={false}
        />
      </View>
    </View>
  )
}
