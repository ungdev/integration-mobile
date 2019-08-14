import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { normalize } from '../../../services/font'
import Tag from '../../../components/Tag'
import moment from 'moment'

class EventsDetails extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, "Détails d'un événement", true)

  render() {
    const event = this.props.navigation.getParam('event', null)
    const { user } = this.props.screenProps
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{event.name}</Text>
        {user.admin > 0 && (
          <Text style={styles.subtitle}>Catégories de l'événement :</Text>
        )}
        {user.admin > 0 && (
          <View style={styles.tags}>
            {JSON.parse(event.categories).map((c, index) => (
              <Tag key={index}>{c}</Tag>
            ))}
          </View>
        )}
        <Text style={styles.subtitle}>Début le : </Text>
        <Text style={styles.p}>
          {moment(event.start_at * 1000).format('DD/MM [à] HH:mm')}
        </Text>
        <Text style={styles.subtitle}>Fin le : </Text>
        <Text style={styles.p}>
          {moment(event.end_at * 1000).format('DD/MM [à] HH:mm')}
        </Text>
        <Text style={styles.subtitle}>Lieu : </Text>
        <Text style={styles.p}>{event.place}</Text>
        <Text style={styles.subtitle}>Description : </Text>
        <Text style={styles.p}>{event.description}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
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
  },
  title: {
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontSize: normalize(20),
    marginTop: 20,
    marginBottom: 5,
    color: '#4098ff'
  },
  p: {
    fontSize: normalize(15),
    textAlign: 'justify'
  }
})

export default EventsDetails
