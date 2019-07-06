import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import ung from '../../../assets/images/ung.png'

class Projects extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, "Projets de l'UNG", true)

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={ung} />
        <Text style={styles.p}>Projets</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  },
  p: {
    width: Dimensions.get('window').width * 0.95,
    padding: 1
  },
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
  button: {
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    color: 'white'
  }
})

export default Projects
