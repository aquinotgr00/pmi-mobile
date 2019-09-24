import React, { Component } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { IconInu, Screen } from 'src/components'
import { getRsvpListApi } from 'src/services/api'
import PendingEvent from './PendingEvent'
import AddRsvpButton from './AddRsvpButton'

export default class EmergencyAndEventScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Lapor Darurat & Event',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-laporan-darurat' color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:true,
       events:[],
       error:null
    }
    this.loadPendingRsvp = this.loadPendingRsvp.bind(this)
  }

  componentDidMount() {
    this.loadPendingRsvp()
  }

  async loadPendingRsvp () {
    const rsvpParams = new URLSearchParams()
    rsvpParams.append('p', '1')
    rsvpParams.append('page', 1)
    this.setState({ isLoading: true, events: [], error: null })
    try {
      const response = await getRsvpListApi(rsvpParams)
      const { status } = response.data

      if (status === 'success') {
        const { data } = response.data
        const { data: events } = data
        this.setState({ isLoading: false, events })
      } else {
        // TODO: handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO: handle error
      this.setState({ isLoading: false })
    }
  }
  
  render() {
    const {isLoading, events} = this.state
    return (
      <Screen
        menu
        title='Lapor Darurat &amp; Event'
        refreshControl={
          <RefreshControl
            
          />
        }
        right={<AddRsvpButton />}
        verticalCenter={events.length===0}
        isLoading={isLoading}
      >
        {
          isLoading
          ?<Text></Text>
          :(
            events.length===0
            ?<Text>Saat ini Anda belum memiliki pengajuan laporan Darurat &amp; Event</Text>
            :<FlatList 
              data={events}
              renderItem={({ item }) =>
                <PendingEvent
                  rsvpId={item.id}
                  title={item.title}
                  thumbnail={item.image_url}
                  createdAt={item.created_at}
                />}
              keyExtractor={item => `${item.id}`}
            />
          )
        }
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  
})