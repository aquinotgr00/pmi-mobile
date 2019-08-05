import React from 'react'
import SplashScreen from 'src/screens/Splash'
import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import CampaignDetailScreen from 'src/screens/Campaign/CampaignDetail'
import CampaignListScreen from 'src/screens/Campaign/CampaignList'
import SearchCampaignScreen from 'src/screens/Campaign/Search'
import DonatorRegistrationFormScreen from 'src/screens/Registration/Donator/Form'
import LoginScreen from 'src/screens/Login'
import ForgotPasswordScreen from 'src/screens/ForgotPassword'
import ResetPasswordScreen from 'src/screens/ResetPassword'
import ManualTransferScreen from 'src/screens/ManualTransfer'
import ThankYouScreen from 'src/screens/ThankYou'
import UserProfileScreen from 'src/screens/UserProfile'
import CheckoutScreen from 'src/screens/Checkout'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import InKindDonationFormScreen from 'src/screens/Donation/InKind'
import FundDonationScreen from 'src/screens/Donation/FundDonation'

import { IconInu } from 'src/components'
import Color from 'src/constants/Color'

const Home = {
  screen: HomeScreen,
  navigationOptions: ({ navigation }) => ({
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-home' color={tintColor} />
    )
  })
}

const VolunteerRegistration = {
  screen: VolunteerRegistrationScreen
}

const drawerContentOptions = {
  contentOptions: {
    activeTintColor: Color.red
  }
}

const GuestDrawerNavigator = createDrawerNavigator({
  Home,
  DonatorRegistration: {
    screen: DonatorRegistrationScreen
  },
  VolunteerRegistration
}, drawerContentOptions)

const DonatorDrawerNavigator = createDrawerNavigator({
  Home,
  VolunteerRegistration,
  UserProfile: {
    screen: UserProfileScreen
  }
}, drawerContentOptions)

const MainNavigator = createStackNavigator({
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
    screen: CampaignDetailScreen
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
  },
  FundDonation: {
    screen: FundDonationScreen
  },
  ManualTransfer: {
    screen: ManualTransferScreen
  },
  ThankYou: {
    screen: ThankYouScreen
  },
  Checkout: {
    screen: CheckoutScreen
  }

}, {
  // initialRouteName: 'InKindDonationForm',
  headerMode: 'none'
})

const RootNavigator = createStackNavigator({
  Main: {
    screen: MainNavigator
  },
  SearchCampaign: {
    screen: SearchCampaignScreen
  }
},
{
  mode: 'modal',
  headerMode: 'none'
})

export default createAppContainer(RootNavigator)
