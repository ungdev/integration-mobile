import React from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'
import { normalize } from '../services/font'

const Card = props => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={props.image} style={styles.image} />
    </View>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.text}>{props.children}</Text>
  </View>
)
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 5,
    margin: 5
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 350,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  title: {
    marginVertical: 5,
    fontSize: normalize(20),
    fontStyle: 'italic',
    color: '#aaa'
  },
  text: {
    fontSize: normalize(15),
    color: '#aaa'
  }
})

export default Card
