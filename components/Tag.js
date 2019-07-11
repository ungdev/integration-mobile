import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { normalize } from '../services/font'

const Tag = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.children}</Text>
  </View>
)
const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 7,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#adc6ff',
    margin: 5
  },
  text: {
    fontSize: normalize(10),
    color: '#2f54eb'
  }
})

export default Tag
