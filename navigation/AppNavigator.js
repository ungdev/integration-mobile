import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import MainMenu from './MainMenu'
import LoginPage from './login/LoginPage'
import EtuLoginPage from './login/EtuLoginPage'
import ProfileBundle from '../Bundles/ProfileBundle/Main'
import PointsBundle from '../Bundles/PointsBundle/Main'
import EventsBundle from '../Bundles/EventsBundle/Main'
import TeamBundle from '../Bundles/TeamBundle/Main'
import UNGBundle from '../Bundles/UNGBundle/Main'
import BDEBundle from '../Bundles/BDEBundle/Main'
import PermsBundle from '../Bundles/PermsBundle/Main'
import AdminNotificationsBundle from '../Bundles/AdminNotificationsBundle/Main'
import UserListBundle from '../Bundles/UserListBundle/Main'
import TeamListBundle from '../Bundles/TeamListBundle/Main'
import CheckinsBundle from '../Bundles/CheckinsBundle/Main'

const Navigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainMenu, // menu with all buttons to select a bundle
    Login: LoginPage,
    EtuLogin: EtuLoginPage,
    Profile: ProfileBundle,
    Points: PointsBundle,
    Events: EventsBundle,
    Perms: PermsBundle,
    Team: TeamBundle,
    UNG: UNGBundle,
    BDE: BDEBundle,
    AdminNotifications: AdminNotificationsBundle,
    UserList: UserListBundle,
    TeamList: TeamListBundle,
    Checkins: CheckinsBundle,
  },
  {
    initialRouteName: 'Login',
  }
)

class AppNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  setUser = (user) => this.setState({ user })

  render() {
    return (
      <Navigator
        screenProps={{ user: this.state.user, setUser: this.setUser }}
      />
    )
  }
}

export default AppNavigator
