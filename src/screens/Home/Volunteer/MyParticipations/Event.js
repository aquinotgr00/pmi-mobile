import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Row, Text, Thumbnail } from 'native-base'
import { withNavigation } from 'react-navigation'
import Color from 'src/constants/Color'
import moment from 'moment'

class Event extends PureComponent {
  constructor(props) {
    super(props)
  
    this.navigateToChatRoom = this.navigateToChatRoom.bind(this)
  }

  navigateToChatRoom () {
    const { rsvpId, title, thumbnail:image, navigation } = this.props
    navigation.navigate('Chat', { rsvpId, title, image })
  }

  render () {
    const {thumbnail:uri, title, lastChat, chatTimestamp } = this.props
    const lastChatTimestamp = moment(chatTimestamp).format('HH:mm')
    return (
      <TouchableOpacity onPress={this.navigateToChatRoom}>
        <Row style={styles.row}>
          <Thumbnail small source={{uri}} />
          <View style={styles.titleColumn}>
            <Text>{title}</Text>
            <Text style={styles.lastChat} numberOfLines={1}>{lastChat}</Text>
          </View>
          <View>
            <Text style={styles.chatTimestamp}>{lastChatTimestamp}</Text>
          </View>
        </Row>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Event)

const styles = StyleSheet.create({
  row:{
    marginVertical:10
  },
  titleColumn:{
    flex:1,
    marginHorizontal:10
  },
  lastChat: {
    fontSize:14,
    color:Color.darkGray,
    marginVertical:3
  },
  chatTimestamp:{
    fontSize:14,
    color:Color.darkGray
  }
})