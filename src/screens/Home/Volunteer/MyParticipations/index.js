import React, { Component } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { FormSectionTitle } from 'src/components'
import Color from 'src/constants/Color'
import axios from 'axios'
import { cancellableRequest, getRsvpListApi } from 'src/services/api'
import Event from './Event'

export default class MyParticipations extends Component {
  constructor (props) {
    super(props)

    this.source = undefined
    this.state = {
      data: [],
      page: 1,
      isLoading: false,
      error: null
    }

    this.loadRsvp = this.loadRsvp.bind(this)
  }

  componentDidMount () {
    this.loadRsvp()
  }

  async loadRsvp () {
    const rsvpParams = new URLSearchParams()
    rsvpParams.append('j', 'approved')
    rsvpParams.append('lc', 1)
    rsvpParams.append('page', 1)
    this.source && this.source.cancel()
    this.source = cancellableRequest()
    this.setState({ isLoading: true, events: [], error: null })
    try {
      const response = await getRsvpListApi(rsvpParams, this.source.token)
      const { status, data: events } = response.data

      if (status === 'success') {
        const { data } = events
        console.log(data)
        this.setState({ isLoading: false, data })
      } else {
        // TODO: handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO: handle error
      if (!axios.isCancel(error)) {
        // TODO: handle error
        this.setState({ isLoading: false, error })
      }
    }
  }

  renderList () {
    const { data } = this.state
    return (
      <>
        {data.length > 0
          ? <FlatList
            data={data}
            renderItem={({ item }) =>
              <Event
                rsvpId={item.id}
                title={item.title}
                thumbnail={item.image_url}
                lastChat={item.activities.length > 0 ? item.activities[0].comment : null}
                chatTimestamp={item.activities.length > 0 ? item.activities[0].created_at : null}
              />}
            keyExtractor={item => `${item.id}`}
          />
          : <View style={styles.emptyContainer}>
            <Text style={{ color: Color.lightGray }}>Belum ada data</Text>
          </View>
        }
      </>

    )
  }

  render () {
    const { isLoading } = this.state
    return (
      <View>
        <FormSectionTitle text='Grup Siaga' />
        { isLoading
          ? <View style={styles.emptyContainer}><ActivityIndicator /></View>
          : this.renderList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
