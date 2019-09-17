import React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Button, Input, Item, Text } from 'native-base'
import { RedButton, Screen } from 'src/components'
import Color from 'src/constants/Color'
import { login } from 'src/actions'
import * as Yup from "yup"

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
  
  LoginSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  })

  render () {
    const title = this.props.navigation.state.params
    return (
      <Screen title={`Masuk Sebagai ${title}`} back verticalCenter>
        <Formik
          initialValues={{
            email: '@mail.com',
            password: 'Open1234'
          }}
          validationSchema={this.LoginSchema}
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
