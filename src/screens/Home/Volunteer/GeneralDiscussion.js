import React, { Component } from 'react'
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import { withNavigation } from 'react-navigation'
import { getRsvpDetailApi } from 'src/services/api'
import AssetImages from 'src/constants/Image'

const rsvpId = 1

class GeneralDiscussion extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      image: '',
      isLoading: false,
      error: null
    }

    this.navigateToChatRoom = this.navigateToChatRoom.bind(this)
    this.getGeneralDiscussionInfo = this.getGeneralDiscussionInfo.bind(this)
  }

  componentDidMount () {
    // need to fetch latest image
    this.getGeneralDiscussionInfo()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.lastUpdate !== this.props.lastUpdate) {
      this.getGeneralDiscussionInfo()
    }
  }

  async getGeneralDiscussionInfo () {
    this.setState({ isLoading: true, error: null })
    try {
      const response = await getRsvpDetailApi(rsvpId)
      const { status, data } = response.data
      if (status === 'success') {
        const { title, image_url: image } = data
        this.setState({ title, image })
      } else {
        // TODO : handle error
      }
    } catch (error) {
      // TODO : handle error
    }
    this.setState({ isLoading: false })
  }

  navigateToChatRoom () {
    const { title, image } = this.state
    this.props.navigation.navigate('Chat', { rsvpId, title, image })
  }

  render () {
    const { image: uri, isLoading } = this.state
    const source = uri ? { uri } : AssetImages.GroupChat
    return (
      <TouchableOpacity style={styles.button} onPress={this.navigateToChatRoom} disabled={isLoading}>
        <Image
          source={source}
          style={{ width: '100%', height: 140 }}
          resizeMode='contain'
        />
        <Text style={styles.title}>PMI DKI Jakarta</Text>
        { isLoading && <ActivityIndicator style={styles.absoluteCenter} /> }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 1, width: 0.2 },
    shadowRadius: 7,
    position: 'relative'
  },
  title: {
    position: 'absolute',
    margin: 15,
    fontWeight: 'bold'
  },
  absoluteCenter: {
    position: 'absolute',
    left: '45%',
    top: '40%'
  }
})

export default withNavigation(GeneralDiscussion)
