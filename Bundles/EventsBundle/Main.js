import {
  createStackNavigator,
} from 'react-navigation'

import Events from './screens/EventsScreen'
import EventsDetails from './screens/EventsDetailsScreen'

export default createStackNavigator({
  Events,
  EventsDetails
})