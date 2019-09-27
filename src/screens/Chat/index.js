import React, { Component } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Screen } from 'src/components'
import TapForChatInfo from './TapForChatInfo'
import Comment from './Comment'
import ChatBar from './ChatBar'
import { getEventActivityApi } from 'src/services/api'
import { pusher } from 'src/utils/communication'

export default class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      refreshing: false,
      comments: [],
      currentPage: 0
    }

    this.loadChat = this.loadChat.bind(this)
    this.addToChat = this.addToChat.bind(this)
  }

  componentDidMount () {
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const channel = pusher.subscribe(`private-event.${rsvpId}`)

    channel.bind('pusher:subscription_error', function (status) {
      // TODO : disable chatbar and show retry to connect button
    })

    channel.bind('pusher:subscription_succeeded', function (status) {
      // TODO : enable chatbar
    })

    channel.bind('event.comment', this.addToChat)

    this.loadChat()
  }

  addToChat (data) {
    const { comment } = data

    this.setState({
      comments: [...this.state.comments, comment]
    })
  }

  async loadChat () {
    this.setState({ isLoading: true, error: null })
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const { currentPage } = this.state
    const chatParams = new URLSearchParams()
    chatParams.append('e', rsvpId)
    chatParams.append('page', currentPage + 1)
    try {
      const response = await getEventActivityApi(chatParams)
      const { status, data } = response.data
      if (status === 'success') {
        const { current_page: currentPage, data: comments } = data

        this.setState({ comments: [...comments.reverse(), ...this.state.comments], currentPage, isLoading: false })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO : handle error
      this.setState({ isLoading: false })
    }
  }

  render () {
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const image = navigation.getParam('image')
    const title = navigation.getParam('title')
    const { isLoading, refreshing, comments } = this.state
    console.log(comments)
    return (
      <Screen
        noBounce
        back
        title={<TapForChatInfo rsvpId={rsvpId} image={image} title={title} />}
        style={{ padding: 0 }}
        containerStyle={{ flexGrow: 1 }}
        isLoading={isLoading}
      >
        <FlatList
          ref='chatBox'
          refreshing={refreshing}
          onRefresh={this.loadChat}
          ListFooterComponent={<View style={{ height: 20 }} />}
          data={comments}
          renderItem={
            ({ item }) => (
              <Comment
                senderName={item.volunteer ? item.volunteer.name : item.admin.name}
                avatar={item.volunteer ? item.volunteer.image_url : null}
                text={item.comment}
                timestamp={item.created_at}
                key={`${item.id}`}
              />
            )
          }
          style={{ height: 200, backgroundColor: '#f2f2f2', padding: 10 }}
          keyExtractor={item => `${item.id}`}
        />

        <ChatBar />
      </Screen>
    )
  }
}
