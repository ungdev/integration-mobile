import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class EventsDetails extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, navigation.getParam('event').name, true)


  render() {
    const event = this.props.navigation.getParam('event', null)
    console.log(event)
    return <ScrollView contentContainerStyle={styles.container} />
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

export default EventsDetails
