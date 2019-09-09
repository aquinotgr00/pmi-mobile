import React from 'react'
import { View } from 'react-native'
import VolunteerAvatar from './VolunteerAvatar'
import NameAndTimestamp from './NameAndTimestamp'
import CommentAndAttachment from './CommentAndAttachment'

export default function Comment(props) {
  return (
    <View style={{flexDirection:'row', marginVertical:10, width:'88%'}}>
      <VolunteerAvatar url={'test'}/>
      <View style={{backgroundColor:'white', borderRadius:15, marginLeft:10, padding:10}}>
        <NameAndTimestamp
          volunteerName={props.volunteerName}
          timestamp={props.timestamp}
        />
        <CommentAndAttachment
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur elit sed pulvinar aliquet. Integer at massa sed velit dignissim ultrices. Vestibulum consectetur bibendum nibh, maximus finibus purus vehicula vel.'
          attachment={false}
        />
      </View>
    </View>
  )
}
