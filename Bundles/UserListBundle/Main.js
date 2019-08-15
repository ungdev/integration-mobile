import { createStackNavigator } from 'react-navigation'

import UserList from './containers/UserList'
import Profile from '../ProfileBundle/screens/MyProfileScreen'

export default createStackNavigator({ UserList, Profile })
