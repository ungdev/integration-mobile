import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { normalize } from '../services/font'

const Checkbox = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
      {props.undetermined ? (
        <Icon
          name='indeterminate-check-box'
          size={30}
          color='orange'
          style={styles.box}
        />
      ) : props.checked ? (
        <Icon name='check-box' size={30} color='#00b5ec' style={styles.box} />
      ) : (
        <Icon
          name='check-box-outline-blank'
          size={30}
          color='#000'
          style={styles.box}
        />
      )}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width * 0.95,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 1,
    marginVertical: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderColor: '#aaa',
    borderBottomWidth: 1
  },
  title: {
    fontSize: normalize(15)
  },
  box: {
    marginRight: 20
  }
})

export default Checkbox
