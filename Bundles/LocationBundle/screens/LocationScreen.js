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
      isActivated: null
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
    const isActivated = await TaskManager.isTaskRegisteredAsync(
      LOCATION_TASK_NAME
    )
    this.setState({ isActivated })
  }

  onPress = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Lowest,
      timeInterval: 1000 * 60 * 5,
      distanceInterval: 1000
    })
    this.setState({ isActivated: true })
  }

  render() {
    const { isActivated } = this.state
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
            onPress={() => this.onPress}
            title='Activer la localisation'
            icon={<Icon name='map-pin' size={30} color='white' />}
          />
        ) : (
          <Text>La location est activée !</Text>
        )}
      </ScrollView>
    )
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    alert(error)
    // Error occurred - check `error.message` for more details.
    return
  }
  if (data) {
    const { locations } = data
    try {
      sendCoord(locations[0].coords.latitude, locations[0].coords.longitude)
    } catch (e) {
      alert(e)
    }
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
