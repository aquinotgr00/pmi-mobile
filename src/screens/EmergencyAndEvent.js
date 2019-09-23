import React, { Component } from 'react'
import { Image, RefreshControl, StyleSheet } from 'react-native'
import { Button, Icon, Text } from 'native-base'
import { IconInu, Screen } from 'src/components'
import Color from 'src/constants/Color';


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
       rsvp:[],
       error:null
    }
    this.createRsvp = this.createRsvp.bind(this)
    this.loadPendingRsvp = this.loadPendingRsvp.bind(this)
  }

  componentDidMount() {
    this.loadPendingRsvp()
  }
  
  async loadPendingRsvp() {
    await new Promise(resolve=>setTimeout(resolve,3000))
    this.setState({isLoading:false, rsvp:[{test:'coba'}], error: null})
  }
  
  createRsvp() {
    this.props.navigation.navigate('Rsvp')
  }

  render() {
    const {isLoading, rsvp} = this.state
    return (
      <Screen
        menu
        title='Lapor Darurat &amp; Event'
        refreshControl={
          <RefreshControl
            
          />
        }
        right={
          <Button style={{backgroundColor:'transparent'}} onPress={this.createRsvp}>
            <Icon type='Entypo' name='plus' style={{color:'#000', marginLeft:0, marginRight:0}}/>
          </Button>
        }
        verticalCenter={rsvp.length===0}
        isLoading={isLoading}
        containerStyle={{backgroundColor:'yellow'}}
      >
        {
          isLoading
          ?<Text>loading ... </Text>
          :(
            rsvp.length===0
            ?<Text>belum ada</Text>
            :<Text>ada</Text>
          )
        }
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  
})