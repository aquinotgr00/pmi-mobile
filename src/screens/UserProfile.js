import React, { Component } from 'react'
import { IconInu, Screen } from 'src/components'
import { getProfileApi } from 'src/services/api'

export default class UserProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profil',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-profil' color={tintColor} />
    ),
	}
	
	constructor (props) {
		this.loadProfile = this.loadProfile.bind(this)
	}

  componentDidMount () {
    this.loadProfile()
	}
	
	async loadProfile () {
		const response = await getProfileApi()
		console.log(response)
	}

  render () {
    return null
  }
}
