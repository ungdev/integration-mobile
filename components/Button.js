import React from 'react'
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native'

const Button = props => {
  return (
    <TouchableHighlight
      style={[styles.buttonContainer, styles.button]}
      onPress={props.onPress}
    >
      <View style={styles.buttonContent}>
        {props.icon}
        <Text
          style={props.icon ? styles.buttonTextWithIcon : styles.buttonText}
        >
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: 250,
    borderRadius: 30
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    color: 'white'
  },
  buttonTextWithIcon: {
    marginLeft: 20,
    color: 'white'
  }
})

export default Button
