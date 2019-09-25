import React from 'react'
import { Image } from 'react-native'
import { Button, Input, Item, Text, View } from 'native-base'
import { Screen, RedButton, FormField } from 'src/components'
import { Formik } from 'formik'
import { resetPasswordApi } from 'src/services/api'
import Config from 'react-native-config'

export default class ForgotPasswordScreen extends React.Component {
  constructor (props) {
    super(props)

    this.requestPasswordReset = this.requestPasswordReset.bind(this)
  }

  async requestPasswordReset (values) {
    values.url_action = 'dummy.frontend'
    try {
      const response = await resetPasswordApi(values)
      const { status } = response.data
      if (status === 'success') {
        this.props.navigation.navigate('Home')
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  render () {
    return (
      <Screen title='Lupa Password' back>
        <Formik
          initialValues={Config.IS_PRODUCTION === '0' ? { email: '@mail.com'}:{}}
          onSubmit={values => this.requestPasswordReset(values)}
        >
          {props => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{marginVertical: 40}} source={require('assets/images/lupa-password.png')} />
              <Text style={{fontWeight: '500', fontSize: 18, marginBottom: 20}}>Lupa Password?</Text>
              <Text style={{fontSize: 14, textAlign: 'center', marginBottom: 50}}>Jangan panik, kami akan segera mengirimkan link untuk reset password ke alamat E-mail anda</Text>
              <FormField name='email' />

              <RedButton text='Kirim Password' onPress={props.handleSubmit} style={{ marginTop: 45 }} />
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}
