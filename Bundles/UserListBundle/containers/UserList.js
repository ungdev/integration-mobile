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

  componentDidUpdate = (prevState) => {
    const { name } = this.state
    if (prevState.name !== name) {
      this.fetchUsers(name)
    }
  }

  handleChange = (value) => {
    this.setState({ name: value })
  }

  render() {
    const { users, name } = this.state
    return (
      <View>
        <InputItem value={name} onChange={this.handleChange} />
        <ScrollView>
          <AntList>
            {users.map((user) => (
              <AntList.Item key={user.id}>{user.first_name}</AntList.Item>
            ))}
          </AntList>
        </ScrollView>
      </View>
    )
  }
}

export default UserList
