import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Divider } from 'react-native-elements'
import { fetchFactions, fetchPoints } from '../../../services/api'
import ProfileElement from '../../ProfileBundle/components/ProfileElement'

class Points extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Résultats des Fations')

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
    const factions = await fetchFactions()
    const points = await fetchPoints()
    this.setState({ factions, points })
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
