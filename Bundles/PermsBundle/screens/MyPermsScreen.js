import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import { fetchUserPerms } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import PermItem from '../components/PermItem'
import moment from 'moment'

class MyPermsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      perms: null
    }
  }
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Mes Perms')

  componentDidMount() {
    this.listener = this.props.navigation.addListener(
      'willFocus',
      this.fetchUserPerms
    )
    this.fetchUserPerms()
  }
  componentWillUnmount() {
    this.listener.remove()
  }
  fetchUserPerms = async () => {
    try {
      const perms = await fetchUserPerms()
      this.setState({ perms })
    } catch (e) {
      console.log(e.response || e)
      if (!this.state.perms) {
        this.setState({ perms: [] })
      }
    }
  }
  render() {
    const { user } = this.props.screenProps
    let { perms } = this.state
    if (!user || !perms)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )

    perms = perms.filter(perm => moment(perm.end * 1000).isAfter())
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {perms.map(perm => (
          <PermItem
            {...perm}
            key={perm.id}
            color={'#a3cdff'}
            navigate={() =>
              this.props.navigation.navigate('PermDetails', {
                perm,
                onGoBack: () => this.fetchUserPerms()
              })
            }
          />
        ))}
        {perms.length === 0 && (
          <Text>Vous n'avez aucune permanence à venir.</Text>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    flexDirection: 'column',
    alignItems: 'center'
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MyPermsScreen
