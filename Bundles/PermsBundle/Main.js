import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../../components/TabBarIcon'
import MyPerms from './screens/MyPermsScreen'
import Search from './screens/SearchScreen'
import PermDetails from './screens/PermDetailsScreen'

// First Stack is the left button
const MyPermsStack = createStackNavigator({
  MyPerms,
  PermDetails
})

// Second Stack is the right button
const SearchStack = createStackNavigator({
  Search,
  PermDetails
})

MyPermsStack.navigationOptions = {
  tabBarLabel: 'Mes perms',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='briefcase' />
}

SearchStack.navigationOptions = {
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='search' />
}

export default createBottomTabNavigator(
  {
    MyPermsStack,
    SearchStack
  },
  {
    initialRouteName: 'MyPermsStack'
  }
)
