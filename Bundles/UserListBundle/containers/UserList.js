import React from 'react'
import { BackHandler, ScrollView, Text, View } from 'react-native'
import { List as AntList, InputItem } from '@ant-design/react-native'
import { fetchUsers } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class UserList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return DefaultTopbar(navigation, 'Liste des utilisateurs', false)
  }
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      name: ''
    }
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
    this.fetchUsers()
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }

  fetchUsers = async () => {
    try {
      const users = await fetchUsers()
      this.setState({ users })
    } catch (e) {
      console.log(e)
    }
  }

  handlePress = user => {
    if (this.props.navigation.getParam('callback')) {
      this.props.navigation.getParam('callback')(user)
      this.props.navigation.pop()
    } else {
      this.props.navigation.push('Profile', { user })
    }
  }

  render() {
    const { name } = this.state
    let { users } = this.state
    users = users.filter(
      user =>
        user.last_name.toLowerCase().startsWith(name.toLowerCase()) ||
        user.first_name.toLowerCase().startsWith(name.toLowerCase())
    )
    return (
      <View>
        <InputItem
          value={name}
          onChange={name => this.setState({ name })}
          placeholder='Rechercher un utilisateur'
        />
        <ScrollView>
          {users.length > 0 ? (
            <AntList>
              {name.length >= 3 &&
                users.map(user => (
                  <AntList.Item
                    key={user.id}
                    onPress={() => this.handlePress(user)}
                  >
                    <Text>
                      {user.first_name} {user.last_name}
                    </Text>
                  </AntList.Item>
                ))}
            </AntList>
          ) : (
            name.length >= 3 && <Text>Aucun utilisateur à afficher</Text>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default UserList
