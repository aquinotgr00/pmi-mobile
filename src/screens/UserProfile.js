import React, { Component } from 'react'
import { IconInu, Screen } from 'src/components'

export default class UserProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profil',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-profil' color={tintColor} />
    ),
  }
  render () {
    return null
  }
}
