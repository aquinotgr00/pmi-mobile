import HomeScreen from 'src/screens/Home'
import { DonatorRegistrationScreen, VolunteerRegistrationScreen } from 'src/screens/Registration'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'

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

export default createAppContainer(DrawerNavigator)
