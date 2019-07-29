import React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Input, Item, Text } from 'native-base'
import { RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { login } from 'src/actions'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.forgotPassword = this.forgotPassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (credentials) {
    this.props.dispatch(login(credentials))
  }

  forgotPassword () {
    this.props.navigation.navigate('ForgotPassword')
  }

  render () {
    return (
      <Screen title='Masuk Sebagai Donatur' back>
        <Formik
          initialValues={{
            email: 'donatur1@mail.com',
            password: 'open1234'
          }}
          onSubmit={values => this.handleLogin(values)}
        >
          {props => (
            <View style={{ alignItems: 'center' }}>
              <Image source={require('assets/images/login.png')} />
              <Item>
                <Input
                  placeholder='Email'
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </Item>
              <Item>
                <Input
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
              </Item>

              <RedButton text='Masuk' onPress={props.handleSubmit} style={{ marginTop: 30 }} />
              <Button full transparent onPress={this.forgotPassword} style={{ marginTop: 30 }}>
                <Text style={{ color: Color.red }}>Lupa Password?</Text>
              </Button>
            </View>
          )}
        </Formik>
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(LoginScreen)
