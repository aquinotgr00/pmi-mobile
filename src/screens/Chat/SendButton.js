import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Color from 'src/constants/Color'

export default class SendButton extends Component {
  constructor(props) {
    super(props)
  
    this.send = this.send.bind(this)
  }
  
  send() {

  }

  render() {
    return (
      <TouchableOpacity onPress={this.send}>
        <Icon name='arrow-circle-up' type='FontAwesome5' style={{ color: Color.red, fontSize: 30 }} />
      </TouchableOpacity>
    )
  }
}
