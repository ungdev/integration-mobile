import React from 'react'
import {
  BackHandler,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import { normalize } from '../../../services/font'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { List } from 'react-native-paper'
import SocialButton from '../../../components/SocialButton'
import { List as AntList } from '@ant-design/react-native'
import { fetchTeam } from '../../../services/api'

class MyTeam extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const team = navigation.getParam('team')
    return DefaultTopbar(
      navigation,
      team ? team.name : 'Mon Équipe',
      team ? true : false
    )
  }
  constructor(props) {
    super(props)
    this.state = {
      team: null
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const team = this.props.navigation.getParam('team')
      if (!team) {
        this.props.navigation.navigate('Main')
        return true
      }
    })
    this.fetchTeam()
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }
  fetchTeam = async () => {
    try {
      const t = this.props.navigation.getParam('team')
      const team = await fetchTeam(
        t ? t.id : this.props.screenProps.user.team_id
      )
      this.setState({ team })
    } catch (e) {
      console.log(e.response || e)
      if (!this.state.team) {
        this.setState({ team: 'error' })
      }
    }
  }

  render() {
    const { team } = this.state
    if (!team) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {team === 'error' ? (
          <Text>Une erreur est survenue, veuillez réessayer plus tard.</Text>
        ) : (
          <ScrollView style={styles.subcontainer}>
            <Text style={styles.title}>{team.name}</Text>
            <View style={styles.social}>
              <SocialButton type='facebook' link={team.facebook} />
            </View>
            {team.faction && (
              <Text style={styles.subtitle}>Faction {team.faction.name}</Text>
            )}
            <List.Accordion
              title="Description de l'équipe"
              style={{ backgroundColor: 'white' }}
            >
              <Text style={styles.p}>{team.description}</Text>
            </List.Accordion>
            <Text style={styles.subtitle}>Chefs d'équipes :</Text>
            <AntList>
              {team.ce.map(user => (
                <AntList.Item
                  arrow='horizontal'
                  key={user.id}
                  onPress={() =>
                    this.props.navigation.push('Profile', { user })
                  }
                >
                  <Text>
                    {user.first_name} {user.last_name}{' '}
                    {user.surname ? `(${user.surname})` : ''}
                  </Text>
                  <AntList.Item.Brief>{user.email}</AntList.Item.Brief>
                </AntList.Item>
              ))}
            </AntList>
            {team.newcomers && team.newcomers.length > 0 && (
              <React.Fragment>
                <Text style={styles.subtitle}>Nouveaux :</Text>
                <AntList>
                  {team.newcomers.map(user => (
                    <AntList.Item
                      arrow='horizontal'
                      key={user.id}
                      onPress={() =>
                        this.props.navigation.push('Profile', { user })
                      }
                    >
                      <Text>
                        {user.first_name} {user.last_name}
                      </Text>
                      <AntList.Item.Brief>{user.email}</AntList.Item.Brief>
                    </AntList.Item>
                  ))}
                </AntList>
              </React.Fragment>
            )}
            <Text style={{ marginBottom: 20 }} />
          </ScrollView>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  subcontainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9
  },

  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})

export default MyTeam
