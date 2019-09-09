import React from 'react'
import { View } from 'react-native'
import VolunteerName from './VolunteerName'
import CommentTimestamp from './CommentTimestamp'

export default function NameAndTimestamp(props) {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10}}>
      <VolunteerName name={props.volunteerName} />
      <CommentTimestamp timestamp={props.timestamp} />
    </View>
  )
}
