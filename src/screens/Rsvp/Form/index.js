import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Textarea, Button, Icon } from 'native-base'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-picker'
import { FormField, FormInput, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import AddressField from 'src/components/AddressField'

export default class Rsvp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:false,
       avatarSource: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  async handleFormSubmit(values) {
    console.log(values)
    this.props.navigation.navigate('RsvpThankYou')
  }

  handleImage() {
    const options = {
      title: 'Tambahkan foto kejadian',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const image = { uri: response.uri };
    
        this.setState({ image });
      }
    })
  }
  
  render() {
    return (
      <Screen
        back
        title='Buat Laporan'
      >
        <Text style={{color:Color.lightGray}}>Laporkan kejadian darurat atau event di sekitarmu agar segera mendapat bantuan dari sukarelawan terdekat</Text>
        <Formik
          initialValues={{ title:'', description:'' }}
          onSubmit={this.handleFormSubmit}
        >
          {props => (
            <View style={{ paddingBottom: 30 }}>
              <FormField label='Judul Kejadian' name='title' />
              <AddressField />
              <FormField nofloat onlyLabel='Detail Kejadian' name='description' style={{ borderBottomWidth: 0, marginTop:20 }} />
              <Textarea
                rowSpan={3}
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
                value={props.values.description}
                autoCapitalize='none'
                style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                autoCompleteType='off'
              />
              <FormField nofloat onlyLabel='Foto Situasi *optional' style={{ borderBottomWidth: 0, marginTop:20 }} />
              <Button transparent block onPress={this.handleImage} style={{marginTop:10,backgroundColor:this.state.image?'transparent':'pink', height:100}}>
                {
                  this.state.image
                  ?<Image source={this.state.image} style={{width: '100%', height: '100%'}} resizeMode='cover' />
                  :<Icon type='SimpleLineIcons' name='camera' style={{color:Color.red, fontSize:32}} />
                  
                }
                
              </Button>
              
              <RedButton
                onPress={props.handleSubmit}
                text='Laporkan'
                style={{ marginTop: 30 }}
                disabled={this.state.isLoading}
              />
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}
