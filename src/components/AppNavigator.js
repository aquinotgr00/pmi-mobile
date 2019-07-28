import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import DonatorRegistrationFormScreen from 'src/screens/Registration/Donator/Form'
import LoginScreen from 'src/screens/Login'
import ForgotPasswordScreen from 'src/screens/ForgotPassword'
import ResetPasswordScreen from 'src/screens/ResetPassword'
import UserProfileScreen from 'src/screens/UserProfile'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import InKindDonationFormScreen from 'src/screens/Donation/InKind'

const Home = { screen: HomeScreen }

const GuestDrawerNavigator = createDrawerNavigator({
  Home,
  DonatorRegistration: {
    screen: DonatorRegistrationScreen
  },
  VolunteerRegistration: {
    screen: VolunteerRegistrationScreen
  }
}, {
  contentOptions: {
    activeTintColor: '#ed1b24'
  }
})

const UserDrawerNavigator = createDrawerNavigator({
  Home,
  VolunteerRegistration: {
    screen: VolunteerRegistrationScreen
  },
  UserProfile: {
    screen: UserProfileScreen
  }
}, {
  contentOptions: {
    activeTintColor: '#ed1b24'
  }
})

const StackNavigator = createStackNavigator({
  GuestNavigator: {
    screen: GuestDrawerNavigator
  },
  UserNavigator: {
    screen: UserDrawerNavigator
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
  initialRouteName: 'InKindDonationForm'
  // initialRouteName: 'GuestNavigator'
})

export default createAppContainer(StackNavigator)
