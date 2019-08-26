import React from 'react'
import {
  Alert,
  Dimensions,
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
import { addUsersToPerm, removeUserFromPerm } from '../../../services/api'
import { List as AntList } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  goToUsers = () => {
    this.props.navigation.push('UserList', { callback: this.add })
  }
  showRemoveAlert = user => {
    Alert.alert(
      'Êtes vous sûr ?',
      `Vous allez retirer ${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()} de la perm`,
      [
        { text: 'Annuler' },
        { text: 'Retirer', onPress: () => this.remove(user) }
      ]
    )
  }
  add = async user => {
    let { perm } = this.state
    try {
      await addUsersToPerm(perm.id, [user.id])
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
  remove = async user => {
    let { perm } = this.state
    try {
      await removeUserFromPerm(perm.id, user.id)
      perm.permanenciers = perm.permanenciers.filter(p => p.id !== user.id)
      this.setState({ perm })
    } catch (e) {
      console.log(e.response || e)
      //TODO send error notification
    }
  }
  scanCallback = user => {
    this.props.navigation.push('ValidateUser', {
      user,
      perm: this.state.perm,
      callback: (commentary, pointsPenalty) =>
        this.validateCallback(user, commentary, pointsPenalty)
    })
  }
  validateCallback = (user, commentary, pointsPenalty) => {
    const { perm } = this.state
    const index = perm.permanenciers.findIndex(u => u.id === user.id)
    if (index === -1)
      perm.permanenciers.push({
        absence_reason: null,
        commentary,
        first_name: user.first_name,
        id: user.id,
        last_name: user.last_name,
        pointsPenalty,
        presence: 'present',
        student_id: user.student_id,
        surname: user.surname
      })
    else {
      perm.permanenciers[index].commentary = commentary
      perm.permanenciers[index].pointsPenalty = pointsPenalty
      perm.permanenciers[index].presence = 'present'
    }
    this.setState({ perm })
  }
  invalidateCallback = (user, commentary, pointsPenalty, absence_reason) => {
    const { perm } = this.state
    const index = perm.permanenciers.findIndex(u => u.id === user.id)
    if (index === -1)
      perm.permanenciers.push({
        absence_reason,
        commentary,
        first_name: user.first_name,
        id: user.id,
        last_name: user.last_name,
        pointsPenalty,
        presence: 'absent',
        student_id: user.student_id,
        surname: user.surname
      })
    else {
      perm.permanenciers[index].commentary = commentary
      perm.permanenciers[index].pointsPenalty = pointsPenalty
      perm.permanenciers[index].presence = 'absent'
      perm.permanenciers[index].absence_reason = absence_reason
    }
    this.setState({ perm })
  }
  render() {
    const { perm } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.subcontainer}>
          <Text style={styles.title}>{perm.type.name}</Text>
          <Text style={styles.subtitle}>Horraire : </Text>
          <Text style={styles.p}>{`Le ${moment(perm.start * 1000).format(
            'DD/MM [de] HH:mm'
          )} à ${moment(perm.end * 1000).format('HH:mm')}`}</Text>
          {perm.pre_open !== null && (
            <Text style={styles.subtitle}>Pré ouverture : </Text>
          )}
          {perm.pre_open !== null && (
            <Text style={styles.p}>{`Le ${moment(perm.pre_open * 1000).format(
              'DD/MM [à] HH:mm'
            )}`}</Text>
          )}
          {perm.open !== null && (
            <Text style={styles.subtitle}>Ouverture : </Text>
          )}
          {perm.open !== null && (
            <Text style={styles.p}>{`Le ${moment(perm.open * 1000).format(
              'DD/MM [à] HH:mm'
            )}`}</Text>
          )}

          <Text style={styles.subtitle}>
            Scanner quelqu'un pour le noter présent
          </Text>
          <Text style={styles.p}>
            Cela l'ajoutera à la perm s'il ne l'était pas déjà :
          </Text>
          <Button
            onPress={() =>
              this.props.navigation.push('Scanner', {
                callback: this.scanCallback
              })
            }
            title="Scanner quelqu'un"
            icon={<Icon name='qrcode' size={30} color='white' />}
          />
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
            Permanenciers ({perm.permanenciers.length}/{perm.nbr_permanenciers})
            :
          </Text>
          <Text style={styles.p}>
            Vous pouvez ici gérer les permanenciers de cette permanence. L'icone
            à gauche indique l'état de la personne : inconnu (
            <Icon
              name='question'
              size={20}
              color='#4098ff'
              style={styles.icon}
            />
            ), présent (
            <Icon name='check' size={20} color='green' style={styles.icon} />)
            ou absent (
            <Icon name='close' size={20} color='red' style={styles.icon} />
            ).
          </Text>
          <Text style={styles.p}>
            Les icones à droite vous permettent d'interagir avec l'utilisateur :{' '}
            <Icon name='check' size={20} color='green' style={styles.icon} />{' '}
            pour le noter présent,{' '}
            <Icon name='close' size={20} color='red' style={styles.icon} /> pour
            le noter absent et <Icon name='trash-o' size={20} color='red' />{' '}
            pour le retirer de la permanence. Vous pouvez ajouter des
            utilisateurs plus bas.
          </Text>
          <AntList>
            {perm.permanenciers.map(user => (
              <AntList.Item key={user.id}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {user.presence && user.presence === 'present' && (
                    <Icon
                      name='check'
                      size={20}
                      color='green'
                      style={styles.icon}
                    />
                  )}
                  {user.presence && user.presence === 'absent' && (
                    <Icon
                      name='close'
                      size={20}
                      color='red'
                      style={styles.icon}
                    />
                  )}
                  {!user.presence && (
                    <Icon
                      name='question'
                      size={20}
                      color='#4098ff'
                      style={styles.icon}
                    />
                  )}
                  <Text>
                    {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}
                  </Text>
                  {(!user.presence || user.presence !== 'present') && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.push('ValidateUser', {
                          user,
                          perm: this.state.perm,
                          callback: (commentary, pointsPenalty) =>
                            this.validateCallback(
                              user,
                              commentary,
                              pointsPenalty
                            )
                        })
                      }
                      style={styles.icon}
                    >
                      <Icon name='check' size={20} color='green' />
                    </TouchableOpacity>
                  )}
                  {(!user.presence || user.presence !== 'absent') && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.push('InvalidateUser', {
                          user,
                          perm: this.state.perm,
                          callback: (
                            commentary,
                            pointsPenalty,
                            absence_reason
                          ) =>
                            this.invalidateCallback(
                              user,
                              commentary,
                              pointsPenalty,
                              absence_reason
                            )
                        })
                      }
                      style={styles.icon}
                    >
                      <Icon name='close' size={20} color='red' />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => this.showRemoveAlert(user)}
                    style={styles.icon}
                  >
                    <Icon name='trash-o' size={20} color='red' />
                  </TouchableOpacity>
                </View>
              </AntList.Item>
            ))}
          </AntList>
          <Button onPress={this.goToUsers} title='Ajouter un permanencier' />
          <Text style={{ marginBottom: 20 }} />
        </ScrollView>
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
  icon: {
    marginHorizontal: 5
  },
  p: {
    fontSize: normalize(15),
    textAlign: 'justify'
  }
})

export default AdminDetailsScreen
