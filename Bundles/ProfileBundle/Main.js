import {
  createStackNavigator,
} from 'react-navigation'

import Profile from './screens/MyProfileScreen'
import QRCode from './screens/QRCodeScreen'
import Team from '../TeamBundle/screens/MyTeamScreen'

export default createStackNavigator({
  Profile,
  QRCode,
  Team,
})