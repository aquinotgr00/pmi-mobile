import React, { Component } from 'react'
import { IconInu, Screen } from 'src/components'

export default class History extends Component {
  static navigationOptions = {
    drawerLabel: 'Riwayat Donasi',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-riwayat-donasi' color={tintColor} />
    ),
  }

  render() {
    return (
      <Screen
        menu
        title='Riwayat Donasi'
      />
    )
  }
}
