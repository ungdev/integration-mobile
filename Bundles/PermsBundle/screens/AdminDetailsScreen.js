import React from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { normalize } from '../../../services/font'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import moment from 'moment'
import Tag from '../../../components/Tag'
import Button from '../../../components/Button'
import { joinPerm, leavePerm } from '../../../services/api'

class AdminDetailsScreen extends React.Component {
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
      console.log(e.response || e)
      //TODO send error notification
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
      //TODO send error notification
    }
  }
  render() {
    const { screenProps } = this.props
    const { user } = screenProps
    const { perm } = this.state
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
              <Tag key={user.id} style={styles.tag}>
                {user.first_name} {user.last_name}
              </Tag>
            ))}
          </View>
          <Text style={styles.subtitle}>
            Permanenciers ({perm.permanenciers.length}/{perm.nbr_permanenciers})
            :
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {perm.permanenciers.map(user => (
              <Tag key={user.id} style={styles.tag}>
                {user.first_name} {user.last_name}
              </Tag>
            ))}
          </View>
          {perm.open && moment(perm.open * 1000).isBefore() &&
            (perm.permanenciers.find(p => p.id === user.id) ? (
              <Button
                color='red'
                onPress={this.showLeaveAlert}
                title='Quitter cette permanence'
              />
            ) : (
              perm.permanenciers.length < perm.nbr_permanenciers && (
                <Button
                  onPress={this.showJoinAlert}
                  title='Rejoindre cette permanence'
                />
              )
            ))}
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

export default AdminDetailsScreen
