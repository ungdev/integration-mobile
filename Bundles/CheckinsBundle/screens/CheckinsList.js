import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetchCheckins } from '../../../services/api'
import { List as AntList } from '@ant-design/react-native'
import Button from '../../../components/Button'

class CheckinsList extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Liste des listes')

  constructor(props) {
    super(props)
    this.state = { checkins: null }
  }

  componentDidMount() {
    this.fetchCheckins()
  }

  fetchCheckins = async () => {
    try {
      const checkins = await fetchCheckins()
      this.setState({ checkins })
    } catch (e) {
      console.log(e.response || e)
    }
  }

  createCallback = checkin => {
    let { checkins } = this.state
    checkins.push(checkin)
    this.setState({ checkins })
    this.fetchCheckins()
  }

  render() {
    const { checkins } = this.state
    if (!checkins) {
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
              this.props.navigation.push('CreateCheckin', {
                callback: this.createCallback
              })
            }
            title='Créer une liste'
            icon={<Icon name='plus' size={30} color='white' />}
          />
          <AntList style={{ width: '100%' }}>
            {checkins.map(checkin => (
              <AntList.Item
                key={checkin.id}
                onPress={() =>
                  this.props.navigation.push('Checkin', {
                    checkin: checkin
                  })
                }
              >
                <Text style={{ flexDirection: 'row' }}>
                  {checkin.prefilled > 0 ? (
                    <Icon
                      name='list'
                      size={20}
                      color='#4098ff'
                      style={{ width: 20 }}
                    />
                  ) : (
                    '     '
                  )}{' '}
                  {checkin.name}
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

export default CheckinsList
