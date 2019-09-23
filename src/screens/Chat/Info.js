import React, { Component } from 'react'
import { Screen } from 'src/components'

export default class Info extends Component {
  render() {
    const { navigation } = this.props
    const rsvpId = navigation.getParam('rsvpId')
    return (
      <Screen
        back
        title={`title : ${rsvpId}`}
      />
    )
  }
}
