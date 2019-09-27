import React, { Component } from 'react'
import { Animated } from 'react-native'
import { Text } from 'native-base'
import { Screen } from 'src/components'
import { getRsvpDetailApi } from 'src/services/api'
export default class RsvpDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      title: '',
      description: '',
      headerImage: null
    }
  }

  componentDidMount () {
    this.loadRsvpDetail()
  }

  async loadRsvpDetail () {
    this.setState({ isLoading: true })
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId', 216)
    try {
      const response = await getRsvpDetailApi(rsvpId)
      const { status, data } = response.data
      if (status === 'success') {
        const { title, description, image_url: headerImage } = data
        this.setState({ isLoading: false, headerImage, title, description })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: true })
      }
    } catch (error) {
      // TODO : handle error
      this.setState({ isLoading: false, error: true })
    }
  }

  render () {
    const { title, description, headerImage, isLoading } = this.state
    const joinRequest = this.props.navigation.getParam('joinRequest', false)
    return (
      <Screen
        noBounce
        back
        title={title}
        headerImage={headerImage}
        animatedHeight={new Animated.Value(0)}
        isLoading={isLoading}
      >
        <Text>{description}</Text>

      </Screen>
    )
  }
}
