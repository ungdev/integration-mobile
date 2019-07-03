import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const Topbar = (navigation, title) => {
  return {
    title,
    headerStyle: {
      backgroundColor: '#4098ff'
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Icon
          name='angle-left'
          size={32}
          style={{ paddingHorizontal: 15 }}
          color='#fff'
        />
      </TouchableOpacity>
    )
  }
}
export default Topbar
