import React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Input, Item, Text } from 'native-base'
import { RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { login } from 'src/actions'
import Login from 'src/validators/Login'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }

    this.forgotPassword = this.forgotPassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.showAlertPopup = this.showAlertPopup.bind(this)
  }

  async handleLogin (credentials) {
    this.setState({ loading: true })
    try {
      await this.props.dispatch(login(credentials))
      this.setState({ loading: false })
      if (this.props.user.token === null) {
        this.showAlertPopup('Email/Password anda salah')
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  forgotPassword () {
    this.props.navigation.navigate('ForgotPassword')
  }
  
  showAlertPopup = message => {
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_SHORT,
    })
  }

  render () {
    const title = this.props.navigation.state.params
    const initialValues = Config.IS_PRODUCTION === '0' ? { email: '@mail.com', password: 'Open1234' } : {}
    return (
      <Screen
        title={`Masuk Sebagai ${title}`}
        back
        verticalCenter
        isLoading={this.state.loading}
      >
        <Formik
          initialValues={{ ...initialValues, mode: title }}
          validationSchema={Login}
          onSubmit={values => this.handleLogin(values)}
        >
          {props => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('assets/images/login.png')} />
              <Item>
                <Input
                  placeholder='Email'
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </Item>
              {props.errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{props.errors.email}</Text>}
              <Item>
                <Input
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
              </Item>
              {props.errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{props.errors.password}</Text>}

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
