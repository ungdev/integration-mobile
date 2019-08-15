import React from 'react'
import { ScrollView, View } from 'react-native'
import { List as AntList, InputItem } from '@ant-design/react-native'
import { fetchUsers } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class UserList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return DefaultTopbar(navigation, 'UserList', false)
  }
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      name: '',
    }
  }

  fetchUsers = async (name = '') => {
    const users = await fetchUsers(name)
    this.setState({ users })
  }

  componentDidMount = () => {
    this.fetchUsers()
  }

  handleChange = (value) => {
    const { users } = this.state
    this.setState({
      name: value,
    })
  }

  render() {
    const { users, name } = this.state
    return (
      <View>
        <InputItem
          value={name}
          onChange={this.handleChange}
          placeholder='Rechercher un utilisateur'
        />
        <ScrollView>
          <AntList>
            {name.length >= 3 &&
              users
                .filter(
                  (user) =>
                    user.last_name.startsWith(name) ||
                    user.first_name.startsWith(name)
                )
                .map((user) => (
                  <AntList.Item
                    key={user.id}
                    onPress={() =>
                      this.props.navigation.push('Profile', { user })
                    }>
                    {user.first_name} {user.last_name}
                  </AntList.Item>
                ))}
          </AntList>
        </ScrollView>
      </View>
    )
  }
}

export default UserList
