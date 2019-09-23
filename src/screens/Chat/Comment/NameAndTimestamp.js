import React from 'react'
import { View } from 'react-native'
import SenderName from './SenderName'
import CommentTimestamp from './CommentTimestamp'

export default function NameAndTimestamp(props) {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
      <SenderName name={props.senderName} />
      <CommentTimestamp timestamp={props.timestamp} />
    </View>
  )
}
