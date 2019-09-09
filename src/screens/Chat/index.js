import React, { Component } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { Input } from 'native-base'
import Pusher from 'pusher-js/react-native'
import Config from 'react-native-config'
import { Screen } from 'src/components'
import Color from 'src/constants/Color'
import TapForChatInfo from './TapForChatInfo'
import SendButton from './SendButton'
import AttachmentButton from './AttachmentButton'
import Comment from './Comment'

Pusher.logToConsole = Config.IS_PRODUCTION==='0'

const pusher = new Pusher(Config.PUSHER_APP_KEY, {
  cluster: 'ap1',
  forceTLS: true
})

const channel = pusher.subscribe('my-channel')

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments:[
        {key: 'a'}, {key: 'b'},{key: 'c'}, {key: 'd'},
        {key: 'e'}, {key: 'f'},{key: 'g'}, {key: 'h'},
        {key: 'i'}, {key: 'j'}
      ]
    }
  
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data))
    })

  }

  render () {
    
    return (
      <Screen
        noBounce
        back
        title={ <TapForChatInfo /> }
        style={{padding:0}}
        containerStyle={{flexGrow:1}}
      >
        <FlatList
          ref='chatBox'
          refreshControl={
            <RefreshControl />
          }
          ListFooterComponent={<View style={{height:20}}/>}
          data={this.state.comments}
          renderItem={
            ({item}) => (
              <Comment 
                volunteerName='John Doe'
                timestamp='2019-09-09 14:29'
              />
            )
          }
          style={{height:200, backgroundColor:'#f2f2f2', padding:10}}
        />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', padding:10, marginBottom:5, borderTopWidth:1, borderTopColor:Color.lightGray }}>
          <AttachmentButton />
          <View style={{ flex:1, flexDirection: 'row', backgroundColor:'#f2f2f2', padding:5, marginLeft:5, borderRadius:25 }}>
            <Input placeholder='Tulis Sesuatu' multiline style={{alignSelf:'center'}}/>
            <SendButton />
          </View>
        </View>
      </Screen>
    )
  }
}
