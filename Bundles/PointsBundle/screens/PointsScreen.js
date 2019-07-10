import React from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { fetchFactions, fetchPoints } from '../../../services/api'
import ProfileElement from '../../ProfileBundle/components/ProfileElement'

class Points extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Résultats des Factions')

  constructor(props) {
    super(props)
    this.state = {
      factions: null,
      points: null
    }
  }

  componentDidMount() {
    this.fetchFactionsAndPoints()
  }
  fetchFactionsAndPoints = async () => {
    try {
      const factions = await fetchFactions()
      const points = await fetchPoints()
      this.setState({ factions, points })
    } catch (e) {
      console.log(e.response || e)
      let { factions, points } = this.state
      if (!factions) factions = []
      if (!points) points = []
      this.setState({ factions, points })
    }
  }

  render() {
    const { factions, points } = this.state
    if (!factions || !points) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {factions.map((faction, index) => (
          <ProfileElement
            key={faction.id}
            type={faction.name}
            value={points[index] + ' points'}
            icon='group'
          />
        ))}
        {factions.length === 0 && (
          <Text>Problème de connexion au serveur, réessayez plus tard.</Text>
        )}
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

export default Points
