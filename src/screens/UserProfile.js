import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { IconInu, RedButton, Screen } from 'src/components'
import { logout } from 'src/actions'

class UserProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profil',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-profil' color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  
    this.logout = this.logout.bind(this)
  }
  

  async logout() {
    await this.props.dispatch(logout())
    const {token} = this.props.user
    if(token===null) {
      const {navigation} = this.props
      navigation.reset([
        NavigationActions.navigate({
          routeName:'GuestNavigator',
          action: NavigationActions.navigate({ routeName: 'Home'})
        })
      ], 0)
    }
  }

  render () {
    return (
      <Screen
        menu
        title='Profile'
      >
        <RedButton text='Logout' onPress={this.logout} />
      </Screen>
    )
  }
}

export default connect(state => ({ user: state.user }))(UserProfile)