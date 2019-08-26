import { createStackNavigator } from 'react-navigation'

import UserList from './containers/UserList'
import Profile from '../ProfileBundle/screens/MyProfileScreen'
import QRCode from '../ProfileBundle/screens/QRCodeScreen'

export default createStackNavigator({ UserList, Profile, QRCode })
