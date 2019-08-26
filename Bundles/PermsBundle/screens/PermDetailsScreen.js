import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { normalize } from '../../../services/font'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import moment from 'moment'
import Tag from '../../../components/Tag'
import Button from '../../../components/Button'
import { joinPerm, leavePerm } from '../../../services/api'

class PermDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, "Détails d'une perm", true)

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.navigation.getParam('perm').id !== nextState.perm.id)
      return { perm: nextProps.navigation.getParam('perm') }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      perm: props.navigation.getParam('perm')
    }
  }
  showJoinAlert = () => {
    Alert.alert(
      'Êtes vous sûr ?',
      'Si vous rejoignez cette perm, vous vous engagez à venir et tenir la perm !',
      [{ text: 'Annuler' }, { text: 'Rejoindre', onPress: this.join }]
    )
  }
  showLeaveAlert = () => {
    Alert.alert(
      'Êtes vous sûr ?',
      "Vous vous êtes engagé à effectuer cette perm, si vous la quitter vous risquez de compromettre l'organisation de l'inté. Prévenez les orgas si ce n'est pas déjà fait !",
      [{ text: 'Annuler' }, { text: 'Quitter', onPress: this.leave }]
    )
  }
  showCustomError = message => {
    Alert.alert('Erreur !', message, [{ text: 'ok' }])
  }
  showError = () => {
    Alert.alert(
      'Une erreur est survenue',
      'Une erreur inconnue est survenue, désolé :/',
      [{ text: 'ok' }]
    )
  }
  join = async () => {
    const { user } = this.props.screenProps
    let { perm } = this.state
    try {
      await joinPerm(perm.id, user.id)
      perm.permanenciers.push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        student_id: user.student_id,
        surname: user.surname
      })
      this.setState({ perm })
    } catch (e) {
      if (e && e.response && e.response.data && e.response.data.message)
        this.showCustomError(e.response.data.message)
      else this.showError()
    }
  }
  leave = async () => {
    const { user } = this.props.screenProps
    let { perm } = this.state
    try {
      await leavePerm(perm.id, user.id)
      perm.permanenciers = perm.permanenciers.filter(p => p.id !== user.id)
      this.setState({ perm })
    } catch (e) {
      console.log(e.response || e)
      this.showError()
    }
  }
  render() {
    const { screenProps } = this.props
    const { user } = screenProps
    const { perm } = this.state

    let button = null
    if (perm.open) {
      // if open date is set, then it's free join, add buttons
      if (perm.pre_open && moment(perm.pre_open * 1000).isBefore()) {
        // if there's a pre open date, check if it's passed
        if (perm.permanenciers.find(p => p.id === user.id)) {
          button = (
            <Button
              color='red'
              onPress={this.showLeaveAlert}
              title='Quitter cette permanence'
            />
          )
        } else if (perm.permanenciers.length < perm.nbr_permanenciers)
          button = (
            <Button
              onPress={this.showJoinAlert}
              title='Rejoindre cette permanence'
            />
          )
      } else if (moment(perm.open * 1000).isBefore()) {
        // if there's no pre date set, check if open date is in the past
        if (perm.permanenciers.find(p => p.id === user.id)) {
          button = (
            <Button
              color='red'
              onPress={this.showLeaveAlert}
              title='Quitter cette permanence'
            />
          )
        } else if (perm.permanenciers.length < perm.nbr_permanenciers)
          button = (
            <Button
              onPress={this.showJoinAlert}
              title='Rejoindre cette permanence'
            />
          )
      }
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{perm.type.name}</Text>
        <Text style={styles.subtitle}>Lieu : </Text>
        <Text style={styles.p}>{perm.place}</Text>
        <Text style={styles.subtitle}>Description : </Text>
        <Text style={styles.p}>{perm.description}</Text>
        <Text style={styles.subtitle}>Horraire : </Text>
        <Text style={styles.p}>{`Le ${moment(perm.start * 1000).format(
          'DD/MM [de] HH:mm'
        )} à ${moment(perm.end * 1000).format('HH:mm')}`}</Text>
        <Text style={styles.subtitle}>Responsables :</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {perm.respos.map(user => (
            <Tag
              key={user.id}
              style={styles.tag}
              onPress={() => this.props.navigation.push('Profile', { user })}
            >
              {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}
            </Tag>
          ))}
        </View>
        <Text style={styles.subtitle}>
          Permanenciers ({perm.permanenciers.length}/{perm.nbr_permanenciers}) :
        </Text>
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}
        >
          {perm.permanenciers.map(user => (
            <Tag
              key={user.id}
              style={styles.tag}
              onPress={() => this.props.navigation.push('Profile', { user })}
            >
              {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}
            </Tag>
          ))}
        </View>
        {perm.open && perm.pre_open && moment(perm.open * 1000).isAfter() && (
          <Text>
            Cette perm ouvrira le{' '}
            {moment(perm.pre_open * 1000).format('DD/MM [à] HH:mm')} si vous
            êtes à l'UTT, sinon elle ouvrira pour tout le monde le{' '}
            {moment(perm.open * 1000).format('DD/MM [à] HH:mm')}
          </Text>
        )}
        {perm.open && !perm.pre_open && moment(perm.open * 1000).isAfter() && (
          <Text>
            Cette perm ouvrira le {moment(perm.open * 1000).format('DD/MM [à] HH:mm')} pour tout le
            monde
          </Text>
        )}
        {button}
        <Text style={{ marginBottom: 20 }} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: 20
  },
  tag: {
    marginLeft: 20
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
  }
})

export default PermDetailsScreen
