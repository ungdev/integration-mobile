import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ProfileElement = props => {
  if (props.value === null) return null
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name={props.icon} size={50} color='#333' />
      </View>
      <View style={styles.text}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{props.type}</Text>
        </View>
        {typeof props.value !== Object ? (
          <Text style={styles.value}>{props.value}</Text>
        ) : (
          props.value
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  icon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: 20,
    alignSelf: 'stretch',
    flex: 1
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  value: {
    fontSize: 20
  }
})

export default ProfileElement
