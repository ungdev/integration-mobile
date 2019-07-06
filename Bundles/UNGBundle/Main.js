import { createStackNavigator } from 'react-navigation'

import UNG from './screens/UNGScreen'
import Projects from './screens/ProjectsScreen'
import UNGEvents from './screens/UNGEventsScreen'

export default createStackNavigator({
  UNG,
  Projects,
  UNGEvents
})
