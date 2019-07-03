import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../services/font'

const GridButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.image && props.image}
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    marginVertical: 1,
    backgroundColor: '#FFFFFF'
  },
  title: {
    position: 'absolute',
    bottom: 5,
    fontSize: normalize(10),
    textAlign: 'center'
  }
})

export default GridButton
