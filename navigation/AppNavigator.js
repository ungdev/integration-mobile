import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import MainMenu from './MainMenu'
import LoginPage from './login/LoginPage'
import EtuLoginPage from './login/EtuLoginPage'
import ProfileBundle from '../Bundles/ProfileBundle/Main'

const Navigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainMenu, // menu with all buttons to select a bundle
    Login: LoginPage,
    EtuLogin: EtuLoginPage,
    Profile: ProfileBundle
  },
  {
    initialRouteName: 'Login'
  }
)

class AppNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })
  
  render() {
    return (
      <Navigator
        screenProps={{ user: this.state.user, setUser: this.setUser }}
      />
    )
  }
}

export default AppNavigator
