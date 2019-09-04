import React from 'react'
import {
  ActivityIndicator,
  BackHandler,
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Button from '../../../components/Button'
import { sendCoord } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'

const LOCATION_TASK_NAME = 'background-location-task'

class LocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Localisation')
  constructor(props) {
    super(props)
    this.state = {
      isActivated: null,
      errorMessages: []
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
    this.checkIsActivated()
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  checkIsActivated = async () => {
    const isActivated = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    this.setState({ isActivated })
  }

  onPress = async () => {
    let { errorMessages } = this.state

    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      errorMessages.push(
        'Vous devez autoriser la localisation pour que ce service fonctionne.'
      )
      this.setState({
        errorMessages
      })
      return
    }
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Lowest,
      timeInterval: 1000 * 60 * 5,
      distanceInterval: 1000,
      foregroundService: {
        notificationTitle: 'Localisation en cours',
        notificationBody:
          'Nous utilisons cette localisation pour localiser les bus.'
      },
      pausesUpdatesAutomatically: true
    })
    this.setState({
      isActivated: true
    })
  }
  disable = async () => {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { isActivated, errorMessages } = this.state
    if (isActivated === null) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {!isActivated ? (
          <Button
            onPress={this.onPress}
            title='Activer la localisation'
            icon={<Icon name='map-pin' size={30} color='white' />}
          />
        ) : (
          <Button
            onPress={this.disable}
            title='Désactiver la localisation'
            icon={<Icon name='map-pin' size={30} color='white' />}
          />
        )}
        {errorMessages.length > 0 && <Text>Message d'erreur : </Text>}
        {errorMessages.map((e, index) => (
          <Text key={index}>{e}</Text>
        ))}
      </ScrollView>
    )
  }
}
const send = async locations => {
  try {
    await sendCoord(locations[0].coords.latitude, locations[0].coords.longitude)
  } catch (e) {
    console.log(e.response)
  }
}
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error)
    console.log(error.message)
    return
  }
  if (data) {
    const { locations } = data
    send(locations)
  }
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  }
})

export default LocationScreen
