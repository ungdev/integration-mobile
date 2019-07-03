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

class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Mon Profile')

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
        {user.surname ? (
          <Text style={styles.surname}>({user.surname})</Text>
        ) : (
          <Text />
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
        <ProfileElement type='E-mail' value={user.email} icon='envelope' />
        <ProfileElement type='Téléphone' value={user.phone} icon='phone' />
        <ProfileElement
          type='Code postal'
          value={user.postal_code}
          icon='home'
        />
        {user.sex && (
          <ProfileElement
            type='Sexe'
            value={user.sex === 'male' ? 'Homme' : 'Femme'}
            icon='venus-mars'
          />
        )}
        <ProfileElement type='Pays' value={user.country} icon='flag' />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
