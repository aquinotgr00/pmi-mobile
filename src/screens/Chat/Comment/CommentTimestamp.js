import React from 'react'
import { Text } from 'native-base'
import moment from 'moment'

export default function CommentTimestamp(props) {
  const timestamp = moment(props.timestamp).format('HH:mm')
  return (
    <Text style={{fontSize:10}}>{timestamp}</Text>
  )
}
