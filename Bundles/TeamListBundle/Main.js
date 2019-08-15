import { createStackNavigator } from 'react-navigation'

import TeamList from './containers/TeamList'
import Team from '../TeamBundle/screens/MyTeamScreen'

export default createStackNavigator({
  TeamList,
  Team
})
