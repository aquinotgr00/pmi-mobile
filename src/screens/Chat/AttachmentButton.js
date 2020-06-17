import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Color from 'src/constants/Color'

export default class AttachmentButton extends Component {
  constructor(props) {
    super(props)
  
    this.attachMedia = this.attachMedia.bind(this)
  }
  
  attachMedia() {

  }

  render() {
    return (
      <TouchableOpacity onPress={this.attachMedia}>
        <Icon name='image-plus' type='MaterialCommunityIcons' style={{ color: Color.red, fontSize: 30 }} />
      </TouchableOpacity>
    )
  }
}
