import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { FormSectionTitle } from 'src/components'

export default class MyParticipations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      isLoading: false,
      error: null
    }

    this.loadRsvp = this.loadRsvp.bind(this)
  }

  componentDidMount () {
    this.loadRsvp()
  }

  async loadRsvp () {
    const respnse = await new Promise(resolve => resolve({}))
  }

  render () {
    return (
      <View>
        <FormSectionTitle text='Grup Siaga' />
        <FlatList
          horizontal
          data={this.state.data}
        />
      </View>
    )
  }
}
