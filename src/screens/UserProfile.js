import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getProfileApi } from 'src/services/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { IconInu, RedButton, Screen } from 'src/components'
import { logout } from 'src/actions'
import { View, Button, Text, Icon } from 'native-base'
import Color from 'src/constants/Color'

class UserProfile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profil',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-profil' color={tintColor} />
    ),
	}

  constructor(props) {
    super(props)
    this.state = {
			isLoading: false,
      user: null,
      isVolunteer: this.props.user.isVolunteer
		}

    this.logout = this.logout.bind(this)
		this.loadProfile = this.loadProfile.bind(this)
		this.navigateToForm = this.navigateToForm.bind(this)
  }

  componentDidMount () {
    this.loadProfile()
	}
	
	async loadProfile () {
    this.setState({isLoading: true})
		try {
			const response = await getProfileApi()
			const { status } = response.data
			if (status === 'success') {
        const user = response.data.data
        console.log(user)
				this.setState({
					user
				})
			}
		} catch (err) {
      console.log(err.response)
		}
    this.setState({isLoading: false})
  }

  async logout() {
    this.setState({isLoading:true})
		const loggingOut = await this.props.dispatch(logout())
		console.log(loggingOut)
    this.setState({isLoading:false})
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
	
	navigateToForm (title) {
    const { user, isVolunteer } = this.state
		this.props.navigation.navigate('UserForm', {title, user, loadProfile: this.loadProfile, isVolunteer})
  }

  render () {
    return (
      <Screen
        menu
        title='Profile'
        isLoading={this.state.isLoading}
      >
				<View style={{paddingHorizontal: 20, height: '65%', marginBottom: 20}}>
					<Image
            source={this.state.isVolunteer
              ? (this.state.user !== null
                ? this.state.user.volunteer.image !== null ? {uri: this.state.user.volunteer.image_url}:require('assets/images/avatar-default.png')
                : require('assets/images/avatar-default.png')
              ) : (this.state.user !== null
                ? this.state.user.donator.image !== null ? {uri: this.state.user.donator.image_url}:require('assets/images/avatar-default.png')
                : require('assets/images/avatar-default.png')
              )
            }
						style={{
              alignSelf: 'center',
              width: '65%',
              height: '100%',
            }}
						/>
				</View>
				<View style={{marginBottom: 20}}>
					<TouchableOpacity onPress={() => this.navigateToForm('Data Diri')} style={style.profileBtn}>
						<Text style={style.profileTextBtn}>
							Data Diri
						</Text>
						<Icon style={style.profileIconBtn} name="arrow-forward" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.navigateToForm('Tempat Tinggal')} style={style.profileBtn}>
						<Text style={style.profileTextBtn}>
							Tempat Tinggal
						</Text>
						<Icon style={style.profileIconBtn} name="arrow-forward" />
					</TouchableOpacity>

          {this.state.isVolunteer &&
            <TouchableOpacity onPress={() => this.navigateToForm('Pengalaman')} style={style.profileBtn}>
              <Text style={style.profileTextBtn}>
                Pengalaman
              </Text>
              <Icon style={style.profileIconBtn} name="arrow-forward" />
            </TouchableOpacity>
          }

					<TouchableOpacity onPress={() => this.navigateToForm('Password')} style={style.profileBtn}>
						<Text style={style.profileTextBtn}>
							Password
						</Text>
						<Icon style={style.profileIconBtn} name="arrow-forward" />
					</TouchableOpacity>
				</View>
        <RedButton outline text='Keluar' onPress={this.logout} />
      </Screen>
    )
  }
}

const style = StyleSheet.create({
  profileBtn: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		borderBottomWidth: 1,
		borderBottomColor: Color.lightGray,
		paddingBottom: 7,
		marginBottom: 10,
	},
	profileTextBtn: {
		width: '90%',
		lineHeight: 35,
		fontWeight: '600'
	},
	profileIconBtn: {
		width: '10%',
		color: Color.lightGray,
		fontSize: 22,
		paddingTop: 5
	}
})

export default connect(state => ({ user: state.user }))(UserProfile)