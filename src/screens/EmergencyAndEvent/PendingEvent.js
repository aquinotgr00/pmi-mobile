import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Row, Text, Thumbnail } from 'native-base'
import moment from 'moment'
import Color from 'src/constants/Color'

export default function PendingEvent (props) {
  const { thumbnail: uri, title, createdAt } = props
  return (
    <TouchableOpacity >
      <Row style={styles.row}>
        <Thumbnail small source={{ uri }} />
        <View style={styles.titleColumn}>
          <Text>{title}</Text>
          <Text style={styles.status}>Menunggu Moderasi</Text>
        </View>
        <View>
          <Text style={styles.createTimestamp}>{moment(createdAt).format('DD MMM, HH:mm')}</Text>
        </View>
      </Row>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 10
  },
  titleColumn: {
    flex: 1,
    marginHorizontal: 10
  },
  status: {
    fontSize: 14,
    color: Color.darkGray,
    marginVertical: 3
  },
  createTimestamp: {
    fontSize: 14,
    color: Color.darkGray
  }
})
