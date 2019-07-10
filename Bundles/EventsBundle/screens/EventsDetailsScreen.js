import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Tag from '../../../components/Tag'
import moment from 'moment'

class EventsDetails extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, navigation.getParam('event').name, true)

  render() {
    const event = this.props.navigation.getParam('event', null)
    const { user } = this.props.screenProps
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {user.admin > 0 && <Text>Catégories de l'événement :</Text>}
        {user.admin > 0 && (
          <View style={styles.tags}>
            {JSON.parse(event.categories).map((c, index) => (
              <Tag key={index}>{c}</Tag>
            ))}
          </View>
        )}
        <Text>
          Début le {moment(event.start_at * 1000).format('DD/MM [à] HH:mm')}
        </Text>
        <Text>
          Fin le {moment(event.end_at * 1000).format('DD/MM [à] HH:mm')}
        </Text>
        <Text>Lieu : {event.place}</Text>
        <Text>{event.description}</Text>
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
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
})

export default EventsDetails
