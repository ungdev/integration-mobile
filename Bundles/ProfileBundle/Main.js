import {
  createStackNavigator,
} from 'react-navigation'

import MyProfile from './screens/MyProfileScreen'
import QRCode from './screens/QRCodeScreen'

export default createStackNavigator({
  MyProfile,
  QRCode,
})