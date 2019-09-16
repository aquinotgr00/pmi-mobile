import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Textarea, Button, Icon } from 'native-base'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-picker'
import { FormField, FormInput, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color';


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

  }

  handleImage() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
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

              <FormField nofloat onlyLabel='Deskripsi Kejadian' name='description' style={{ borderBottomWidth: 0, marginTop:20 }} />
              <Textarea
                rowSpan={3}
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
                value={props.values.description}
                autoCapitalize='none'
                style={{ borderBottomWidth: 1, borderBottomColor: Color.lightGray }}
                autoCompleteType='off'
              />

              <Button transparent onPress={this.handleImage} >
                {
                  this.state.avatarSource
                  ?<Image source={this.state.avatarSource} style={{width: 50, height: 50}} />
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
