import React from 'react'
import { Text, View, ScrollView, Spin } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import Button from '../../../components/Button'
import { sendCoord } from '../../../services/api'

const LOCATION_TASK_NAME = 'background-location-task'

class LocationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: null
    }
  }

  componentDidMount() {
    this.checkIsActivated()
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
    if (isActivated === null) return <Spin />
    return (
      <View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
      </View>
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

export default LocationScreen
