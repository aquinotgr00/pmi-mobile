import React, { Component } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { NavigationEvents } from 'react-navigation'
import { IconInu, Screen } from 'src/components'
import { getRsvpListApi } from 'src/services/api'
import PendingEvent from './PendingEvent'
import AddRsvpButton from './AddRsvpButton'
import Color from 'src/constants/Color'

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
       error:null,
       notFirstTime:false,
       refreshing:false
    }
    this.loadPendingRsvp = this.loadPendingRsvp.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  componentDidMount() {
    this.loadPendingRsvp()
  }

  async loadPendingRsvp (page=1) {
    const rsvpParams = new URLSearchParams()
    rsvpParams.append('p', '1')
    rsvpParams.append('page', page)
    const nTime = this.state.notFirstTime? { }:{ notFirstTime:true }
    this.setState({ isLoading: true, events: [], error: null, ...nTime })
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

  onRefresh() {

  }
  
  render() {
    const {isLoading, events, notFirstTime} = this.state
    return (
      <Screen
        menu
        title='Lapor Darurat &amp; Event'
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        right={<AddRsvpButton />}
        verticalCenter={isLoading || events.length===0}
        noBounce={events.length===0}
        isLoading={isLoading}
      >
        {notFirstTime && <NavigationEvents onDidFocus={this.loadPendingRsvp} /> }
        {
          isLoading
          ?<Text style={{textAlign:'center'}}>memuat...</Text>
          :(
            events.length===0
            ?<Text style={{textAlign:'center', color:Color.darkGray}}>Saat ini Anda belum memiliki pengajuan laporan Darurat &amp; Event</Text>
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