import React from 'react'
import { Image, View } from 'react-native'
import { Button, Text } from 'native-base'
import { IconInu, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'

export class VolunteerRegistrationScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login/Register Relawan',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-donatur-regist' color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  
    this.navigateToLogin = this.navigateToLogin.bind(this)
    this.navigateToRegistrationForm = this.navigateToRegistrationForm.bind(this)
  }

  navigateToRegistrationForm() {
    this.props.navigation.navigate('VolunteerRegistrationForm')
  }
  
  navigateToLogin() {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Screen title='Daftar Sebagai Relawan' menu>
        <View style={{alignItems:'center'}}>
          <Image source={require('assets/images/daftar-donatur.png')} style={{flex:1,marginBottom:20}}/>
          <View style={{alignItems:'center'}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontWeight:'500'}}>BERSAMA KITA BANTU SESAMA</Text>
              <Text style={{marginTop: 20}}>Lorem ipsum dolor sit amet,</Text>
              <Text>consectetur adipiscing</Text>
            </View>
            <RedButton text='Daftar' onPress={this.navigateToRegistrationForm} style={{marginTop:30}} />
            <Button full transparent onPress={this.navigateToLogin} style={{marginTop:20}} >
              <Text style={{color:Color.black}}>Sudah memiliki akun? <Text style={{color:Color.red}}>Masuk</Text></Text>
            </Button>
          </View>
        </View>
      </Screen>
    );
  }
}