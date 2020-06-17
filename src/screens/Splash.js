import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { checkSettingUpdateApi, downloadAreaData } from 'src/services/api'
import moment from 'moment'

class Splash extends Component {
  constructor (props) {
    super(props)

    this.userRedirection = this.userRedirection.bind(this)
    this.downloadSettings = this.downloadSettings.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
    this.getSettingsData = this.getSettingsData.bind(this)
    this.downloadAreaData = this.downloadAreaData.bind(this)
  }

  componentDidMount () {
    this.downloadSettings()
    this.userRedirection()
  }

  async downloadSettings () {
    try {
      const response = await checkSettingUpdateApi()
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        data.map(setting => {
          this.updateSetting(setting)
        })
      }
    } catch (err) {
      console.log(err.response)
    }
  }

	updateSetting (setting) {
    let oldSettingDate = this.getSettingsData(setting.settings)
		// if (oldSettingDate === 'null') {
		// 	this.downloadAreaData(setting.settings)
		// 	AsyncStorage.setItem(setting.settings, JSON.stringify(setting.last_updated))
		// 	oldSettingDate = setting.last_updated
		// }
		oldSettingDate = moment(oldSettingDate)
		const newSettingDate = moment(setting.last_updated)
		const diff = oldSettingDate.diff(newSettingDate, 'days')
		// if (diff > 0) {
      console.log(setting.settings)
			this.downloadAreaData(setting.settings)
		// }
	}
	
	async getSettingsData (name) {
    try {
      AsyncStorage.getItem(name, (error, result) => {
        if (result) {
          return result
        }
        return 'null'
      })
    } catch (err) {
      console.log(err.response)
    }
	}

	async downloadAreaData (name) {
    try {
      const response = await downloadAreaData(name)
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        AsyncStorage.setItem(`${name}_data`, JSON.stringify(data))
      }
    } catch (err) {
      console.log(err.response)
    }
	}

  userRedirection () {
    const { navigation, user } = this.props
    let routeName = 'GuestNavigator'
    if (user.token) {
      routeName = 'DonatorNavigator'
      if (user.isVolunteer) {
        routeName = 'VolunteerNavigator'
      }
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
