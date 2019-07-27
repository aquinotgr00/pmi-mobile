import React from 'react'
import { View } from 'react-native'

export const ProgressBar = (props) => {
  return (
    <View style={{
      position: 'relative',
      // marginLeft: props.left,
      marginVertical: 10,
      height: props.height,
      width: '100%',
      borderRadius: 50,
      backgroundColor: 'pink'
    }}>
      <View style={{
        backgroundColor: 'red',
        height: '100%',
        borderRadius: 50,
        width: `${props.percentage}%`
      }} />
    </View>
  )
}