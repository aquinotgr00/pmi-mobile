import React from 'react'
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import { RedButton, Screen } from 'src/components'

export default function ThankYou(props) {
  return (
    <Screen
      title='Terima Kasih'
      verticalCenter
      noBounce
    >
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Image source={require('assets/images/terimakasih-sudah-melapor.png')} style={{alignSelf:'center'}} />
          <Text style={{fontWeight:'bold', marginVertical:10, textAlign:'center'}}>Terimakasih Sudah Melapor</Text>
          <Text>Tunggu beberapa saat lagi, laporan anda akan segera kami tindaklanjuti.</Text>
        </View>
        <View style={{flex:1, width:'100%'}}>
          <RedButton text='Kembali Ke Beranda' onPress={()=>props.navigation.navigate('VolunteerHome')}/>
        </View>
        
      </View>
      
    </Screen>
  )
}
