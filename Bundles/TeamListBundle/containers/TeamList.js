import React from 'react'
import { ScrollView, View } from 'react-native'
import { List as AntList } from '@ant-design/react-native'
import { fetchTeams } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class TeamList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return DefaultTopbar(navigation, 'Liste des équipes', false)
  }
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
    }
  }

  fetchTeams = async () => {
    const teams = await fetchTeams()
    this.setState({ teams })
  }

  componentDidMount = () => {
    this.fetchTeams()
  }

  render() {
    const { teams } = this.state
    return (
      <View>
        <ScrollView>
          <AntList>
            {teams.map((team) => (
              <AntList.Item
                key={team.id}
                onPress={() =>
                  this.props.navigation.push('Team', {
                    back: true,
                    team_id: team.id,
                  })
                }>
                {team.name}
              </AntList.Item>
            ))}
          </AntList>
        </ScrollView>
      </View>
    )
  }
}

export default TeamList