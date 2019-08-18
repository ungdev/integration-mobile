import { createStackNavigator } from 'react-navigation'

import CheckinsList from './screens/CheckinsList'
import Checkin from './screens/Checkin'
import Scanner from '../ProfileBundle/screens/ScanScreen'
import UserList from '../UserListBundle/containers/UserList'
import CreateCheckin from './screens/CreateCheckin'

export default createStackNavigator({
  CheckinsList,
  Checkin,
  UserList,
  Scanner,
  CreateCheckin
})
