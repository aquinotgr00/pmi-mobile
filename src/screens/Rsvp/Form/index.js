import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Textarea, Button, Icon } from 'native-base'
import { Formik } from 'formik'
import ImagePicker from 'react-native-image-picker'
import { FormField, RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import AddressField from 'src/components/AddressField'
import { createRsvpApi } from 'src/services/api'
import Config from 'react-native-config'

export default class Rsvp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:false,
       image: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  async handleFormSubmit(values) {
    const { title, description } = values
    const { image } = this.state
    this.setState({isLoading:true})
    try {
      const response = await createRsvpApi({title,description, image})
      const { status, data } = response.data
      if(status==='success') {
        this.setState({isLoading:false})
        this.props.navigation.navigate('RsvpThankYou')
      }
      else {
        // TODO : handle error
      }
    } catch (error) {
      // TODO : handle error
      console.log(error)
    }
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
    const title = Config.IS_PRODUCTION==='0'?'Test Title':''
    const description = Config.IS_PRODUCTION==='0'?'Test Description':''
    const initialValues = {title, description}
    return (
      <Screen
        back
        title='Buat Laporan'
        isLoading={this.state.isLoading}
      >
        <Text style={{color:Color.lightGray}}>Laporkan kejadian darurat atau event di sekitarmu agar segera mendapat bantuan dari sukarelawan terdekat</Text>
        <Formik
          initialValues={initialValues}
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
              <FormField nofloat onlyLabel='Foto Situasi' style={{ borderBottomWidth: 0, marginTop:20 }} />
              <Button transparent block onPress={this.handleImage} style={{marginTop:10,backgroundColor:this.state.image?'transparent':'pink', height:120}}>
                {
                  this.state.image
                  ?<Image source={this.state.image} style={{width: '100%', height: 120}} resizeMode='cover' />
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
