import React from 'react'
import SplashScreen from 'src/screens/Splash'
import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import CampaignScreen from 'src/screens/Campaign'
import CampaignListScreen from 'src/screens/Campaign/List'
import DonatorRegistrationFormScreen from 'src/screens/Registration/Donator/Form'
import LoginScreen from 'src/screens/Login'
import ForgotPasswordScreen from 'src/screens/ForgotPassword'
import ResetPasswordScreen from 'src/screens/ResetPassword'
import UserProfileScreen from 'src/screens/UserProfile'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import InKindDonationFormScreen from 'src/screens/Donation/InKind'

import { IconInu } from 'src/components'
import Theme from 'src/constants/Theme'

const Home = {
  screen: HomeScreen,
  navigationOptions: ({ navigation }) => ({
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-home' color={tintColor} />
    )
  })
}

const drawerContentOptions = {
  contentOptions: {
    activeTintColor: Theme.color.red
  }
}

const GuestDrawerNavigator = createDrawerNavigator({
  Home,
  DonatorRegistration: {
    screen: DonatorRegistrationScreen
  },
  VolunteerRegistration: {
    screen: VolunteerRegistrationScreen
  }
}, drawerContentOptions)

const DonatorDrawerNavigator = createDrawerNavigator({
  Home,
  VolunteerRegistration: {
    screen: VolunteerRegistrationScreen
  },
  UserProfile: {
    screen: UserProfileScreen
  }
}, drawerContentOptions)

const StackNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen
  },
  GuestNavigator: {
    screen: GuestDrawerNavigator
  },
  DonatorNavigator: {
    screen: DonatorDrawerNavigator
  },
  Campaign: {
    screen: CampaignScreen
  },
  CampaignList: {
    screen: CampaignListScreen
  },
  DonatorRegistrationForm: {
    screen: DonatorRegistrationFormScreen
  },
  Login: {
    screen: LoginScreen
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen
  },
  ResetPassword: {
    screen: ResetPasswordScreen
  },
  InKindDonationForm: {
    screen: InKindDonationFormScreen
  }

}, {
  headerMode: 'none',
  // initialRouteName: 'InKindDonationForm'
  // initialRouteName: 'GuestNavigator'
})

export default createAppContainer(StackNavigator)
