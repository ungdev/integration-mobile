import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const Topbar = (navigation, title, back = false) => {
  return {
    title,
    headerStyle: {
      backgroundColor: '#4098ff'
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerLeft:
      back !== null &&
      (back ? (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            navigation.pop()
            if (navigation.getParam('onGoBack'))
              navigation.getParam('onGoBack')()
          }}
        >
          <Text style={{ marginLeft: 8, color: 'white', fontSize: 20 }}>
            Retour
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Icon
            name='angle-left'
            size={32}
            style={{ paddingHorizontal: 15 }}
            color='#fff'
          />
        </TouchableOpacity>
      ))
  }
}
export default Topbar
