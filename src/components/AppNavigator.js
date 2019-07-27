import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import CampaignScreen from 'src/screens/Campaign'
import DonatorRegistrationFormScreen from 'src/screens/Registration/Donator/Form'
import LoginScreen from 'src/screens/Login'
import ForgotPasswordScreen from 'src/screens/ForgotPassword'
import ResetPasswordScreen from 'src/screens/ResetPassword'

import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import InKindDonationFormScreen from 'src/screens/Donation/InKind'

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
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

const StackNavigator = createStackNavigator({
  Main: {
    screen: DrawerNavigator
  },
  Campaign: {
    screen: CampaignScreen
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
  headerMode: 'none'
})

export default createAppContainer(StackNavigator)
