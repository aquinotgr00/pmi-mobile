import React from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';

export function HomeBanner (props) {
    return (
        <ImageBackground
            source={{ uri: 'https://via.placeholder.com/350x160' }}
            style={{
              height: 160,
              width: '100%',
              position: 'relative', // because it's parent
              top: 2,
              left: 2,
              marginBottom: 35
            }}
          >
            <View
              style={{
                position: 'absolute', // child
                bottom: 20, // position where you want
                left: 20
              }}
            >
              <Text style={{color:'white',fontSize:12}}>Bersama Kita Bantu Sesama</Text>
              <Text style={{color:'white',marginTop:3,fontWeight:'bold'}}>Daftar Menjadi Relawan PMI sekarang!</Text>
              <TouchableOpacity style={{
                marginTop:10,
                borderWidth:1,
                borderColor:'white',
                borderRadius:4,
                width:160,
                paddingVertical:5
              }}>
                <Text style={{color:'white',textAlign:'center',fontWeight:'600',fontSize:14}}>DAFTAR SEKARANG</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}