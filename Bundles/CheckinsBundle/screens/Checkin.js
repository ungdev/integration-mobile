import React from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  fetchCheckin,
  addUserToCheckin,
  removeUserToCheckin
} from '../../../services/api'
import Button from '../../../components/Button'
import { List as AntList } from '@ant-design/react-native'

let self = null

class Checkin extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const checkin = navigation.getParam('checkin')
    return {
      ...DefaultTopbar(navigation, checkin.name, true),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            if (self) self.addUserModal()
          }}
        >
          <Icon
            name='user-plus'
            size={30}
            style={{ paddingHorizontal: 15 }}
            color='#fff'
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)
    self = this
    this.state = { checkin: null }
  }

  componentDidMount() {
    this.fetchCheckin()
    this.interval = setInterval(this.fetchCheckin, 5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchCheckin = async () => {
    try {
      const checkin = await fetchCheckin(
        this.props.navigation.getParam('checkin').id
      )
      this.setState({ checkin })
    } catch (e) {
      console.log(e.response || e)
    }
  }
  toggleUser = async user => {
    const { checkin } = this.state

    try {
      const index = checkin.users.findIndex(u => u.id === user.id)
      if (checkin.users[index].pivot.checked > 0) {
        await removeUserToCheckin(checkin.id, user.qrcode)
        checkin.users[index].pivot.checked = 0
      } else {
        await addUserToCheckin(checkin.id, user.qrcode)
        checkin.users[index].pivot.checked = 1
      }
      this.setState({ checkin })
    } catch (e) {
      console.log(e.response || e)
    }
  }

  addUserModal = () =>
    this.props.navigation.push('UserList', { callback: this.forceAddUser })

  forceAddUser = async user => {
    let { checkin } = this.state
    try {
      await addUserToCheckin(checkin.id, user.qrcode, true) // force add
      const index = checkin.users.findIndex(u => u.id === user.id)
      if (index > -1) {
        if (checkin.users[index].pivot.checked) {
          Alert.alert('Attention !', 'Cette personne était déjà validée', [
            { text: 'ok' }
          ])
        } else {
          checkin.users[index].pivot.checked = 1
        }
      } else {
        checkin.users.push({
          ...user,
          pivot: { checked: 1 }
        })
      }

      this.setState({ checkin })
    } catch (e) {
      console.log(e.response || e)
      //TODO send error notification
    }
  }
  showForceAddAlert = user => {
    Alert.alert(
      'Pas dans la liste',
      `Cet utilisateur n'est pas dans la liste, souhaitez vous forcer son ajout ?`,
      [
        { text: 'Annuler' },
        { text: 'Forcer', onPress: () => this.forceAddUser(user) }
      ]
    )
  }
  scanCallback = async user => {
    const { checkin } = this.state
    const index = checkin.users.findIndex(u => u.id === user.id)
    try {
      if (index > -1) {
        if (checkin.users[index].pivot.checked) {
          Alert.alert('Attention !', 'Cette personne était déjà validée', [
            { text: 'ok' }
          ])
        } else {
          await addUserToCheckin(checkin.id, user.qrcode)
          checkin.users[index].pivot.checked = 1
        }
        this.setState({ checkin })
      } else {
        if (checkin.prefilled) {
          this.showForceAddAlert(user)
        } else {
          this.forceAddUser(user)
        }
      }
    } catch (e) {
      console.log(e.response || e)
      //TODO send error notification
    }
  }
  render() {
    const { checkin } = this.state
    if (!checkin) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }

    return (
      <View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <Button
            onPress={() =>
              this.props.navigation.push('Scanner', {
                callback: this.scanCallback
              })
            }
            title="Scanner quelqu'un"
            icon={<Icon name='qrcode' size={30} color='white' />}
          />
          <AntList style={{ width: '100%' }}>
            {checkin.users.map(user => (
              <AntList.Item key={user.id} onPress={() => this.toggleUser(user)}>
                <Text style={{ flexDirection: 'row' }}>
                  {user.pivot.checked > 0 ? (
                    <Icon
                      name='check'
                      size={20}
                      color='green'
                      style={{ width: 20 }}
                    />
                  ) : (
                    <Icon
                      name='close'
                      size={20}
                      color='red'
                      style={{ width: 20 }}
                    />
                  )}{' '}
                  {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}
                </Text>
              </AntList.Item>
            ))}
          </AntList>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20
  }
})

export default Checkin
