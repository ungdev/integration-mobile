import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tooltip } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const ProfileElement = props => {
  if (props.value === null) return null
  return (
    <View style={styles.container}>
      <Icon name={props.icon} size={50} color='#333' />
      <View style={styles.text}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{props.type}</Text>
          {props.private && (
            <Tooltip popover={<Text>Information privée</Text>}>
              <Icon name='lock' size={20} color='#000' />
            </Tooltip>
          )}
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
  text: {
    marginLeft: 20
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    fontSize: 20
  }
})

export default ProfileElement
