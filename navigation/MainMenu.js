import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Appbar } from 'react-native-paper'
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

class MainMenu extends React.Component {
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
    let grid = []
    let content = [
      {
        name: 'Mon profil',
        image: 'user',
        destination: 'profile'
      },
      {
        name: 'Points',
        image: 'trophy'
      },
      {
        name: 'Plan',
        image: 'map'
      },
      {
        name: 'Gubu',
        image: 'book'
      },
      {
        name: 'Événements',
        image: 'calendar'
      }
    ]
    //orga
    content.push(
      {
        name: 'Slack',
        image: 'slack'
      },
      {
        name: 'Listes',
        image: 'tasks'
      }
    )

    //ce ou nouveau
    content.push({
      name: 'Mon équipe',
      image: 'users'
    })

    // tous sauf nouveau

    content.push({
      name: 'Perms',
      image: 'table'
    })

    //admin
    content.push(
      {
        name: 'Équipes',
        image: 'users'
      },
      {
        name: 'Étudiants',
        image: 'list-ul'
      }
    )

    content.push(
      {
        name: 'UNG',
        image: 'desktop'
      },
      {
        name: 'BDE',
        image: 'star'
      },
      {
        name: 'Se déconnecter',
        image: 'sign-out',
        destination: 'logout'
      }
    )
    let i,
      j,
      gridContent = []
    for (i = 0; i < content.length; i += 3) {
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
            image={<Icon name={section.image} size={70} color='#333' />}
            onPress={() => this.click(section.destination)}
          />
        )
      })
      grid.push(
        <View key={key++} style={styles.row}>
          {rowContent}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <Appbar style={styles.bottom} />
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
    marginTop: 55
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#333'
  }
})

export default MainMenu
