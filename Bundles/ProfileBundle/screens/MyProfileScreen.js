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
import ProfileElement from '../components/ProfileElement'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'

class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Mon Profil')

  render() {
    const { user } = this.props.screenProps
    if (!user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.fullName}>
          {user.first_name} {user.last_name}
        </Text>
        {user.surname && <Text style={styles.surname}>({user.surname})</Text>}
        <Button
          onPress={() =>
            this.props.navigation.navigate('QRCode', { code: user.qrcode })
          }
          title='Afficher mon QR Code'
          icon={<Icon name='qrcode' size={30} color='white' />}
        />
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
        <ProfileElement type='E-mail' value={user.email} icon='envelope' />
        <ProfileElement type='Téléphone' value={user.phone} icon='phone' />
        {user.sex !== null && (
          <ProfileElement
            type='Sexe'
            value={user.sex === 0 ? 'Homme' : 'Femme'}
            icon='venus-mars'
          />
        )}
        {user.postal_code > 0 && (
          <ProfileElement
            type='Code postal'
            value={user.postal_code}
            icon='home'
          />
        )}
        {user.city !== '' && (
          <ProfileElement type='Ville' value={user.city} icon='building' />
        )}
        {user.country !== '' && (
          <ProfileElement type='Pays' value={user.country} icon='flag' />
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
  }
})

export default MyProfile
