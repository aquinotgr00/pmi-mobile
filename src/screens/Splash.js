import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class Splash extends Component {
  constructor (props) {
    super(props)

    this.downloadSettings = this.downloadSettings.bind(this)
    this.userRedirection = this.userRedirection.bind(this)
  }

  componentDidMount () {
    this.downloadSettings()
    this.userRedirection()
  }

  downloadSettings () {

  }

  userRedirection () {
    const { navigation, user } = this.props
    let routeName = 'GuestNavigator'
    if (user.token) {
      routeName = 'DonatorNavigator'
    }
    navigation.reset([NavigationActions.navigate({ routeName })], 0)
  }

  render () {
    return (
      <View style={styles.perfectCenter}>
        <Image source={require('assets/images/logo-pmi-splash.png')} />
      </View>
    )
  }
}

export default connect(state => ({ user: state.user }))(Splash)

const styles = StyleSheet.create({
  perfectCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
