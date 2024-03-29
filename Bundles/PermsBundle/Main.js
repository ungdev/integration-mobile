import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import { BackHandler, Dimensions, Text } from 'react-native'

import TabBarIcon from '../../components/TabBarIcon'
import MyPerms from './screens/MyPermsScreen'
import Search from './screens/SearchScreen'
import Admin from './screens/AdminScreen'
import PermDetails from './screens/PermDetailsScreen'
import AdminDetails from './screens/AdminDetailsScreen'
import Scanner from '../ProfileBundle/screens/ScanScreen'
import ValidateUser from './screens/ValidateUserScreen'
import InvalidateUser from './screens/InvalidateUserScreen'
import UserList from '../UserListBundle/containers/UserList'
import Profile from '../ProfileBundle/screens/MyProfileScreen'

// First Stack is the left button
const MyPermsStack = createStackNavigator({
  MyPerms,
  PermDetails,
  Profile
})

// Second Stack is the middle button
const SearchStack = createStackNavigator({
  Search,
  PermDetails,
  Profile
})

// Third Stack is the right button
const AdminStack = createStackNavigator({
  Admin,
  AdminDetails,
  Scanner,
  ValidateUser,
  InvalidateUser,
  UserList,
  Profile
})

class PermBundle extends React.Component {
  constructor(props) {
    super(props)
    let routes = [
      { key: 'MyPermsStack', title: 'Mes perms', icon: 'briefcase' },
      { key: 'SearchStack', title: 'Liste', icon: 'search' }
    ]
    if (props.screenProps.user.admin > 0 || props.screenProps.user.orga > 0) {
      routes = [
        { key: 'MyPermsStack', title: 'Mes perms', icon: 'briefcase' },
        { key: 'SearchStack', title: 'Liste', icon: 'search' },
        { key: 'AdminStack', title: 'Admin', icon: 'magic' }
      ]
    }
    this.state = {
      index: 0,
      routes
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }

  goTo = destination => this.props.navigation.navigate(destination)

  render() {
    return (
      <TabView
        screenProps={this.props.screenProps}
        navigationState={this.state}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'MyPermsStack':
              return (
                <MyPermsStack
                  screenProps={{ ...this.props.screenProps, goTo: this.goTo }}
                />
              )
            case 'SearchStack':
              return (
                <SearchStack
                  screenProps={{ ...this.props.screenProps, goTo: this.goTo }}
                />
              )
            case 'AdminStack':
              return (
                <AdminStack
                  screenProps={{ ...this.props.screenProps, goTo: this.goTo }}
                />
              )
            default:
              return null
          }
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4098ff' }}
            style={{ backgroundColor: 'white' }}
            renderIcon={({ route, focused }) => (
              <TabBarIcon focused={focused} name={route.icon} />
            )}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color: focused ? '#4098ff' : '#ccc', margin: 2 }}>
                {route.title}
              </Text>
            )}
          />
        )}
        tabBarPosition='bottom'
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}

export default PermBundle
