import {
  createStackNavigator,
} from 'react-navigation'

import MyTeam from './screens/MyTeamScreen'
import Profile from '../ProfileBundle/screens/MyProfileScreen'

export default createStackNavigator({
  MyTeam,
  Profile
})