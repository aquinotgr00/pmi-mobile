import React, { Component } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { connect } from 'react-redux'
import { Input } from 'native-base'
import Pusher from 'pusher-js/react-native'
import Config from 'react-native-config'
import { Screen } from 'src/components'
import Color from 'src/constants/Color'
import TapForChatInfo from './TapForChatInfo'
import SendButton from './SendButton'
import AttachmentButton from './AttachmentButton'
import Comment from './Comment'
import { getEventActivityApi } from 'src/services/api'

Pusher.logToConsole = Config.IS_PRODUCTION === '0'

class Chat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading:false,
      refreshing:false,
      comments: [],
      currentPage:0
    }

    this.fetchPreviousChat = this.fetchPreviousChat.bind(this)
    this.addToChat = this.addToChat.bind(this)
  }

  componentDidMount () {
    const { navigation, user } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const pusher = new Pusher(Config.PUSHER_APP_KEY, {
      authEndpoint: `${Config.SERVER_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      },
      cluster: 'ap1',
      forceTLS: true
    })

    const channel = pusher.subscribe(`private-event.${rsvpId}`)

    channel.bind('pusher:subscription_error', function (status) {
      console.log(status)
    })

    channel.bind('event.comment', this.addToChat)

    this.loadChat(rsvpId)
  }

  addToChat(data) {
    const {comment} = data
    
    this.setState({
      comments:[...this.state.comments, comment]
    })
  }

  async loadChat(rsvpId, page=1) {
    this.setState({ isLoading: true, error: null })
    const chatParams = new URLSearchParams()
    chatParams.append('e', rsvpId)
    chatParams.append('page',page)
    try {
      const response = await getEventActivityApi(chatParams)
      const { status, data } = response.data
      if (status === 'success') {
        const { current_page:currentPage, data:comments } = data
        
        this.setState({ comments:[ ...this.state.comments, ...comments.reverse()], currentPage, isLoading:false })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO : handle error
      this.setState({ isLoading: false })
    }
    
  }

  fetchPreviousChat() {
    /* const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const { currentPage } = this.state
    this.loadChat(rsvpId, currentPage+1) */
  }

  render () {
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    const image = navigation.getParam('image')
    const title = navigation.getParam('title')
    return (
      <Screen
        noBounce
        back
        title={<TapForChatInfo rsvpId={rsvpId} image={image} title={title} />}
        style={{ padding: 0 }}
        containerStyle={{ flexGrow: 1 }}
        isLoading={this.state.isLoading}
      >
        <FlatList
          ref='chatBox'
          refreshing={this.state.refreshing}
          onRefresh={this.fetchPreviousChat}
          ListFooterComponent={<View style={{ height: 20 }} />}
          data={this.state.comments}
          renderItem={
            ({ item }) => (
              <Comment
                senderName={item.volunteer_id?item.volunteer.name:item.admin.name}
                text={item.comment}
                timestamp={item.created_at}
                key={`${item.id}`}
              />
            )
          }
          style={{ height: 200, backgroundColor: '#f2f2f2', padding: 10 }}
          keyExtractor={item => `${item.id}`}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 5, borderTopWidth: 1, borderTopColor: Color.lightGray }}>
          <AttachmentButton />
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 5, marginLeft: 5, borderRadius: 25 }}>
            <Input placeholder='Tulis Sesuatu' multiline style={{ alignSelf: 'center' }} />
            <SendButton />
          </View>
        </View>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(Chat)
