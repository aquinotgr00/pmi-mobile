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

const Home = { screen: HomeScreen }
const drawerContentOptions = {
  contentOptions: {
    activeTintColor: '#ed1b24'
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
  initialRouteName: 'GuestNavigator'
})

export default createAppContainer(StackNavigator)
