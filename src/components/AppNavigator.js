import React from 'react'
import SplashScreen from 'src/screens/Splash'
import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import CampaignDetailScreen from 'src/screens/Campaign/CampaignDetail'
import CampaignListScreen from 'src/screens/Campaign/CampaignList'
import SearchCampaignScreen from 'src/screens/Campaign/Search'
import DonatorRegistrationFormScreen from 'src/screens/Registration/Donator/Form'
import VolunteerRegistrationFormScreen from 'src/screens/Registration/Volunteer/Form'
import LoginScreen from 'src/screens/Login'
import ForgotPasswordScreen from 'src/screens/ForgotPassword'
import ResetPasswordScreen from 'src/screens/ResetPassword'
import ManualTransferScreen from 'src/screens/ManualTransfer'
import ThankYouScreen from 'src/screens/ThankYou'
import CheckoutScreen from 'src/screens/Checkout'

import UserProfileScreen from 'src/screens/UserProfile'
import UserFormScreen from 'src/screens/User/Form'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import InKindDonationFormScreen from 'src/screens/Donation/InKindDonation'
import FundDonationScreen from 'src/screens/Donation/FundDonation'
import DonationHistoryScreen from 'src/screens/Donation/History'

import VolunteerHomeScreen from 'src/screens/Home/Volunteer'
import EmergencyAndEventScreen from 'src/screens/EmergencyAndEvent'
import RsvpScreen from 'src/screens/Rsvp/Form'
import RsvpThankYouScreen from 'src/screens/Rsvp/Form/ThankYou'
import RsvpListScreen from 'src/screens/Rsvp/List'
import RsvpDetailScreen from 'src/screens/Rsvp/Detail'
import ChatScreen from 'src/screens/Chat'

import { IconInu } from 'src/components'
import Color from 'src/constants/Color'

const drawerContentOptions = {
  overlayColor: 'rgba(0, 0, 0, 0.60)',
  contentOptions: {
    activeTintColor: Color.red,
    itemStyle: {
      paddingVertical: 7,
      marginBottom: 3
    }
  }

}

const Home = {
  screen: HomeScreen,
  navigationOptions: ({ navigation }) => ({
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-home' color={tintColor} />
    )
  })
}

const UserProfile = {
  screen: UserProfileScreen
}

const VolunteerHome = {
  screen: VolunteerHomeScreen,
  navigationOptions: ({ navigation }) => ({
    drawerLabel: 'Beranda',
    drawerIcon: ({ tintColor }) => (
      <IconInu name='icon-pmi-home' color={tintColor} />
    )
  })
}

const GuestDrawerNavigator = createDrawerNavigator({
  Home,
  DonatorRegistration: {
    screen: DonatorRegistrationScreen
  },
  VolunteerRegistration: {
    screen: VolunteerRegistrationScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Login/Register Relawan',
      drawerIcon: ({ tintColor }) => (
        <IconInu name='icon-pmi-relawan-regist' color={tintColor} />
      )
    })
  }
}, drawerContentOptions)

const DonatorDrawerNavigator = createDrawerNavigator({
  Home,
  DonationHistory: {
    screen: DonationHistoryScreen
  },
  UserProfile
}, drawerContentOptions)

const VolunteerDrawerNavigator = createDrawerNavigator({
  VolunteerHome,
  EmergencyAndEvent: {
    screen: EmergencyAndEventScreen
  },
  UserProfile
  /*
  ,VolunteerProfile: {
    screen: VolunteerProfileScreen
  }
  */
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
  VolunteerNavigator: {
    screen: VolunteerDrawerNavigator
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
  VolunteerRegistrationMain: {
    screen: VolunteerRegistrationScreen
  },
  VolunteerRegistrationForm: {
    screen: VolunteerRegistrationFormScreen
  },
  Chat: {
    screen: ChatScreen
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
  },
  Rsvp: {
    screen: RsvpScreen
  },
  RsvpThankYou: {
    screen: RsvpThankYouScreen
  },
  RsvpList: {
    screen: RsvpListScreen
  },
  RsvpDetail: {
    screen: RsvpDetailScreen
  },
  UserForm: {
    screen: UserFormScreen
  }

}, {
  // initialRouteName: 'Splash',
  initialRouteName: 'VolunteerRegistrationForm',
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
