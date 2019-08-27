import React from 'react'
import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const options = {}

class ChallengeList extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Liste des Défis')

  constructor(props) {
    super(props)
    this.state = { language: 'java' }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
  camera = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        alert(
          "Désolé, mais pour prendre une photo il faut nous donner l'autorisation d'accéder à la caméra ;)"
        )
        return
      }
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    })
    console.log('RESULT ', res)
  }
  gallery = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert("Désolé, mais pour ouvrir la gallerie photo il faut nous donner l'autorisation d'y accéder ;)")
        return
      }
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    })
    console.log('RESULT ', res)
  }
  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <Button
            onPress={this.camera}
            title='Camera'
            icon={<Icon name='plus' size={30} color='white' />}
          />
          <Button
            onPress={this.gallery}
            title='Gallery'
            icon={<Icon name='plus' size={30} color='white' />}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20
  }
})

export default ChallengeList
