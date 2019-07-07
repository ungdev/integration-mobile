import React from 'react'
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native'
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
    this.fetchEvents()
  }
  fetchEvents = async () => {
    try {
      const events = await fetchEvents(this.props.screenProps.user.id)
      this.setState({ events })
    } catch (e) {
      console.log(e)
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
    console.log(events)
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingTop: 20
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Events
