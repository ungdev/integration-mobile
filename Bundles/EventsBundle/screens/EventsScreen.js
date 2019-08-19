import React from 'react'
import {
  BackHandler,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { fetchEvents } from '../../../services/api'
import EventItem from '../components/EventItem'

class Events extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Liste des événements')

  constructor(props) {
    super(props)
    this.state = {
      events: null
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
    this.fetchEvents()
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  fetchEvents = async () => {
    try {
      const events = await fetchEvents(this.props.screenProps.user.id)
      this.setState({ events })
    } catch (e) {
      console.log(e.response || e)
      if (!this.state.events) this.setState({ events: [] })
    }
  }

  render() {
    const { events } = this.state
    if (!events) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {events.map(event => (
          <EventItem
            {...event}
            key={event.id}
            navigate={() =>
              this.props.navigation.navigate('EventsDetails', { event })
            }
          />
        ))}
        {events.length === 0 && <Text>Aucun événement à afficher.</Text>}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Events
