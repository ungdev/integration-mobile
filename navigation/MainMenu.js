import React from 'react'
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Linking
} from 'react-native'
import GridButton from '../components/Menu/GridButton'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY,
  USER_KEY
} from '../constants/StorageKey'
import { fetchUser, getToken } from '../services/api'
import { registerForExpoPushNotifications } from '../services/expoPushNotifications'
import DefaultTopbar from '../constants/DefaultTopbar'
import { createStackNavigator } from 'react-navigation'

class MainMenu extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Intégration UTT', null)

  constructor(props) {
    super(props)
    this.checkToken()
    registerForExpoPushNotifications()
  }

  checkToken = async () => {
    try {
      const token = await getToken()
      if (token) {
        this.getUserInformations()
      } else {
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }
  click = async d => {
    switch (d) {
      case 'profile':
        this.props.navigation.navigate('Profile')
        break
      case 'points':
        this.props.navigation.navigate('Points')
        break
      case 'events':
        this.props.navigation.navigate('Events')
        break
      case 'ung':
        this.props.navigation.navigate('UNG')
        break
      case 'notifs':
        this.props.navigation.navigate('AdminNotifications')
        break
      case 'slack':
        Linking.canOpenURL('slack://open').then(supported => {
          if (supported) {
            Linking.openURL('slack://open')
          } else {
            Linking.openURL('https://bde-utt.slack.com/')
          }
        })
        break
      case 'etu':
        Linking.openURL('https://etu.utt.fr/')
        break
      case 'logout':
        this.logout()
        break
      default:
        break
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, '')
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, '')
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, '')
      this.props.navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }

  getUserInformations = async () => {
    try {
      const user = await fetchUser()
      console.log('user:', user)
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      this.props.screenProps.setUser(user)
    } catch (e) {
      console.log(e.response)
      this.logout()
    }
  }

  render() {
    const { user } = this.props.screenProps
    if (!user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    let grid = []
    let content = [
      { name: 'Mon profil', icon: 'user', destination: 'profile' },
      { name: 'Points', icon: 'trophy', destination: 'points' },
      { name: 'Plan', icon: 'map' },
      { name: 'Gubu', icon: 'book' },
      { name: 'Événements', icon: 'calendar', destination: 'events' }
    ]
    //orga
    if (user.orga) {
      content.push(
        {
          name: 'Slack',
          image: require('../assets/images/slack.png'),
          destination: 'slack'
        },
        { name: 'Listes', icon: 'tasks' }
      )
    }

    //ce ou nouveau
    if (user.team) {
      content.push({ name: 'Mon équipe', icon: 'users' })
    }

    // tous sauf nouveau
    if (!user.is_newcomer) {
      content.push(
        { name: 'Perms', icon: 'table' },
        { name: 'Site étudiant', icon: 'graduation-cap', destination: 'etu' }
      )
    }

    //admin
    if (user.admin) {
      content.push(
        { name: 'Équipes', icon: 'users' },
        { name: 'Étudiants', icon: 'list-ul' },
        { name: 'Notifications', icon: 'bullhorn', destination: 'notifs' }
      )
    }

    content.push(
      {
        name: '',
        image: require('../assets/images/ung.png'),
        destination: 'ung'
      },
      {
        name: '',
        image: require('../assets/images/bdeutt.png')
      },
      {
        name: 'Se déconnecter',
        icon: 'sign-out',
        destination: 'logout'
      }
    )
    let gridContent = []
    for (let i = 0; i < content.length; i += 3) {
      gridContent.push(content.slice(i, i + 3))
    }

    let key = 0
    gridContent.forEach(row => {
      let rowContent = []
      row.forEach(section => {
        rowContent.push(
          <GridButton
            key={key++}
            title={section.name}
            image={
              section.icon ? (
                <Icon name={section.icon} size={70} color='#333' />
              ) : (
                <Image
                  source={section.image}
                  style={section.name ? styles.shortImage : styles.image}
                />
              )
            }
            onPress={() => this.click(section.destination)}
          />
        )
      })
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      grid.push(
        <View key={key++} style={styles.row}>
          {rowContent}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <ScrollView style={styles.grid}>{grid}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6'
  },
  grid: {
    flex: 1,
    marginTop: 3
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  empty: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    marginHorizontal: 1,
    marginVertical: 1
  },
  image: {
    width: Dimensions.get('window').width / 3 - 20,
    height: Dimensions.get('window').width / 3 - 20
  },
  shortImage: {
    width: Dimensions.get('window').width / 4 - 25,
    height: Dimensions.get('window').width / 4 - 25
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default createStackNavigator({ MainMenu })
