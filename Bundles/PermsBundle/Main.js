import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import {  Dimensions, Text } from 'react-native'

import TabBarIcon from '../../components/TabBarIcon'
import MyPerms from './screens/MyPermsScreen'
import Search from './screens/SearchScreen'
import Admin from './screens/AdminScreen'
import PermDetails from './screens/PermDetailsScreen'
import AdminDetails from './screens/AdminDetailsScreen'

// First Stack is the left button
const MyPermsStack = createStackNavigator({
  MyPerms,
  PermDetails
})

// Second Stack is the middle button
const SearchStack = createStackNavigator({
  Search,
  PermDetails
})

// Third Stack is the right button
const AdminStack = createStackNavigator({
  Admin,
  AdminDetails
})

class PermBundle extends React.Component {
  constructor(props) {
    super(props)
    let routes = [
      { key: 'MyPermsStack', title: 'Mes perms', icon: 'briefcase' },
      { key: 'SearchStack', title: 'Liste', icon: 'search' }
    ]
    if (props.screenProps.user.admin > 0) {
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
