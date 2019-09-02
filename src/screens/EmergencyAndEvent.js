import React, { Component } from 'react'
import { Image, RefreshControl } from 'react-native'
import { Button, Icon } from 'native-base'
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
       
    }
    this.createRsvp = this.createRsvp.bind(this)
  }
  
  createRsvp() {
    this.props.navigation.navigate('Rsvp')
  }

  render() {
    return (
      <Screen
        menu
        title='Lapor Darurat & Event'
        refreshControl={
          <RefreshControl
            
          />
        }
        right={
          <Button style={{backgroundColor:'transparent'}} onPress={this.createRsvp}>
            <Icon type='Entypo' name='plus' style={{color:'#000', marginLeft:0, marginRight:0}}/>
          </Button>
        }
      />
    )
  }
}
