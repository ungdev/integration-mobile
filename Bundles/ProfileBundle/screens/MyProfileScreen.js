import React from 'react'
import {
  Alert,
  BackHandler,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Divider } from 'react-native-elements'
import ProfileElement from '../components/ProfileElement'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'
import SocialButton from '../../../components/SocialButton'
import { fetchTeam, fetchUser } from '../../../services/api'
import { Linking } from 'expo'

class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user')
    return DefaultTopbar(
      navigation,
      user
        ? user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()
        : 'Mon Profil',
      user ? true : false
    )
  }

  constructor(props) {
    super(props)
    this.state = { team: null, user: null }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const user = this.props.navigation.getParam('user')
      if (!user) {
        this.props.navigation.navigate('Main')
        return true
      }
    })
    this.fetchUser()
    this.fetchTeam()
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }

  fetchTeam = async () => {
    try {
      let user = this.props.navigation.getParam('user')
      if (!user) user = this.props.screenProps.user
      const team = await fetchTeam(user.team_id)
      this.setState({ team })
    } catch (e) {
      console.log(e.response || e)
    }
  }
  fetchUser = async () => {
    try {
      let u = this.props.navigation.getParam('user')
      if (!u) this.setState({ user: this.props.screenProps.user })
      else {
        const user = await fetchUser(u.id)
        this.setState({ user: { ...u, ...user } })
      }
    } catch (e) {
      console.log(e.response || e)
    }
  }

  showPhonePopup = user => {
    Alert.alert(
      'Voulez vous appeler ou envoyer un message ?',
      `${user.first_name.toUpperCase()} ${user.last_name} ${user.phone}`,
      [
        {
          text: 'Appeler',
          onPress: () => Linking.openURL(`tel:${user.phone}`)
        },
        {
          text: 'Message',
          onPress: () => Linking.openURL(`sms:${user.phone}`)
        },
        { text: 'Annuler' }
      ]
    )
  }

  render() {
    const { user } = this.state
    const thisuser = this.props.screenProps.user
    if (!thisuser || !user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    console.log('USER PROFILE', user)
    const privateInformation = user.id === thisuser.id || thisuser.admin > 0
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.fullName}>
          {user.first_name} {user.last_name}
        </Text>
        {user.surname !== null && user.surname !== '' && (
          <Text style={styles.surname}>({user.surname})</Text>
        )}
        <View style={styles.social}>
          <SocialButton type='facebook' link={user.facebook} />
        </View>
        {privateInformation && (
          <Button
            onPress={() =>
              this.props.navigation.navigate('QRCode', { code: user.id })
            }
            title={
              this.props.navigation.getParam('user')
                ? 'Afficher son QR Code'
                : 'Afficher mon QR Code'
            }
            icon={<Icon name='qrcode' size={30} color='white' />}
          />
        )}
        <Divider style={{ width: '90%' }} />
        <ProfileElement
          type='Branche'
          value={
            user.branch +
            ' ' +
            (user.level ? user.level : '') +
            (user.speciality ? ' ' + user.speciality : '')
          }
          icon='graduation-cap'
        />
        {user.email !== null && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${user.email}`)}
            style={styles.button}
          >
            <ProfileElement type='E-mail' value={user.email} icon='envelope' />
          </TouchableOpacity>
        )}
        {user.phone !== null && (
          <TouchableOpacity
            onPress={() => this.showPhonePopup(user)}
            style={styles.button}
          >
            <ProfileElement type='Téléphone' value={user.phone} icon='phone' />
          </TouchableOpacity>
        )}

        {user.sex !== null && (
          <ProfileElement
            type='Sexe'
            value={user.sex === 0 ? 'Homme' : 'Femme'}
            icon='venus-mars'
          />
        )}
        {user.postal_code > 0 && privateInformation && (
          <ProfileElement
            type='Code postal'
            value={user.postal_code}
            icon='home'
          />
        )}
        {user.city !== '' && privateInformation && (
          <ProfileElement type='Ville' value={user.city} icon='building' />
        )}
        {user.country !== '' && privateInformation && (
          <ProfileElement type='Pays' value={user.country} icon='flag' />
        )}

        {this.state.team && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.push('Team', {
                team: user.team
              })
            }
            style={styles.button}
          >
            <ProfileElement
              type='Équipe'
              value={this.state.team.name}
              icon='users'
            />
          </TouchableOpacity>
        )}
        {user.god_father && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.push('Profile', {
                user: user.god_father
              })
            }
            style={styles.button}
          >
            <ProfileElement
              type='Parrain'
              value={
                <Text>
                  {`${user.god_father.first_name} ${
                    user.god_father.last_name
                  }\n`}
                  {`${user.god_father.email}`}
                </Text>
              }
              icon='user'
            />
            <ProfileElement
              type='Message de ton parrain'
              value={<Text>{user.god_father.referral_text}</Text>}
              icon='comment-o'
            />
          </TouchableOpacity>
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
  avatar: { marginTop: 20 },
  value: {
    fontSize: 20
  },
  fullName: {
    marginTop: 10,
    fontSize: 30
  },
  surname: {
    fontSize: 20,
    marginBottom: 20
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  button: { flex: 1, alignSelf: 'stretch' }
})

export default MyProfile
