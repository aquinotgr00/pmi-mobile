import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'native-base'
import AttachmentButton from './AttachmentButton'
import SendButton from './SendButton'
import Color from 'src/constants/Color'
import { postEventActivityApi } from 'src/services/api'

export default class ChatBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      comment:''
    }

    this.handleTypingComment = this.handleTypingComment.bind(this)
    this.sendComment = this.sendComment.bind(this)
  }

  handleTypingComment(comment) {
    this.setState({comment})
  }

  async sendComment() {
    const { comment } = this.state
    if (comment) {
      try {
        const response = await postEventActivityApi()
        const { status } = response.data
        if(status==='success') {
          this.setState({comment:''})
        }
      } catch (error) {
        
      }
    }
  }
  
  render() {
    const { comment } = this.state
    return (
      <View style={styles.wrapper}>
        <AttachmentButton />
        <View style={styles.textInputWrapper}>
          <Input
            placeholder='Tulis Sesuatu'
            multiline
            style={{ alignSelf: 'center' }}
            value={comment}
            onChange={this.handleTypingComment}
          />
          <SendButton onPress={this.sendComment} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderTopWidth: 1,
    borderTopColor: Color.lightGray
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 5,
    marginLeft: 5,
    borderRadius: 25
  }
})