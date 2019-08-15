import React from 'react'
import {
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import { SegmentedControl } from '@ant-design/react-native'
import { fetchAdminPerms } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import PermItem from '../components/PermItem'
import moment from 'moment'

class AdminScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      perms: null,
      selected: null
    }
  }
  static navigationOptions = ({ screenProps }) =>
    DefaultTopbar({ navigate: screenProps.goTo }, 'Liste des perms')

  componentDidMount() {
    this.listener = this.props.navigation.addListener(
      'willFocus',
      this.fetchPerms
    )
    this.fetchPerms()
  }
  componentWillUnmount() {
    this.listener.remove()
  }
  fetchPerms = async () => {
    try {
      const perms = await fetchAdminPerms()
      this.setState({ perms })
    } catch (e) {
      console.log(e.response || e)
      if (!this.state.perms) {
        this.setState({ perms: [] })
      }
    }
  }
  getDays = perms => {
    let tab = []
    perms.forEach(perm => {
      const dayindex = moment(perm.start * 1000).format('e')
      let day = this.getDay(dayindex)

      if (!tab.find(t => t === day)) tab.push(day)
    })
    return tab
  }
  getDay = index => {
    switch (index) {
      case '0':
        return 'Dimanche'

      case '1':
        return 'Lundi'

      case '2':
        return 'Mardi'

      case '3':
        return 'Mercredi'

      case '4':
        return 'Jeudi'

      case '5':
        return 'Vendredi'

      case '6':
        return 'Samedi'
    }
    return 'Dimanche'
  }
  getColor = perm => {
    if (perm.permanenciers.find(p => p.id === this.props.screenProps.user.id))
      return '#a3cdff'
    if (perm.permanenciers.length >= perm.nbr_permanenciers) return 'white'
    return 'orange'
  }
  onChange = e => this.setState({ selected: e })
  render() {
    const { user } = this.props.screenProps
    let { perms } = this.state
    if (!user || !perms)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    perms.sort((a, b) => {
      if (a.start > b.start) return 1
      if (a.start < b.start) return -1
      return 0
    })
    const days = this.getDays(perms)
    perms = perms.filter(perm => moment(perm.end * 1000).isAfter())
    if (this.state.selected) {
      perms = perms.filter(
        perm =>
          this.getDay(moment(perm.start * 1000).format('e')) ===
          this.state.selected
      )
    } else if (perms.length > 0) {
      let initialday = moment(perms[0].start * 1000).format('e')
      perms = perms.filter(
        perm => moment(perm.start * 1000).format('e') === initialday
      )
    }
    console.log(perms)
    return (
      <View style={styles.topContainer}>
        {days.length > 1 && (
          <View style={styles.toolbar}>
            <SegmentedControl onValueChange={this.onChange} values={days} />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.container}>
          {perms.map(perm => (
            <PermItem
              {...perm}
              key={perm.id}
              color={this.getColor(perm)}
              navigate={() =>
                this.props.navigation.navigate('AdminDetails', {
                  perm,
                  onGoBack: this.fetchPerms
                })
              }
            />
          ))}
          {perms.length === 0 && <Text>Aucune perm à afficher.</Text>}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center'
  },
  toolbar: {
    width: Dimensions.get('window').width
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AdminScreen
