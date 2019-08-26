import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'
import { validatePerm } from '../../../services/api'
import { normalize } from '../../../services/font'
import NumericInput from 'react-native-numeric-input'

class ValidateUser extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return DefaultTopbar(navigation, 'Valider la présence', true)
  }

  constructor(props) {
    super(props)
    this.state = { pointsPenalty: 0 }
  }

  validateUser = async () => {
    try {
      await validatePerm(
        this.props.navigation.getParam('perm').id,
        this.props.navigation.getParam('user').id,
        this.state.commentary,
        this.state.pointsPenalty
      )
      this.props.navigation.getParam('callback')()
      this.props.navigation.pop()
    } catch (e) {
      console.log(e.response || e)
    }
  }
  render() {
    const user = this.props.navigation.getParam('user')
    const perm = this.props.navigation.getParam('perm')
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.fullName}>
          {user.first_name.toUpperCase()} {user.last_name.toUpperCase()}
        </Text>
        {user.surname && <Text style={styles.surname}>({user.surname})</Text>}

        <Divider style={{ width: '90%' }} />

        <Text style={styles.subtitle}>
          Vous pouvez ajouter un commentaire sur cette personne :
        </Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          onChangeText={commentary => this.setState({ commentary })}
          value={this.state.commentary}
        />
        <Text style={styles.subtitle}>
          Vous pouvez ajouter une pénalité de points à cette personne (si la
          personne était en retard, que son travail laissait à désirer,...):
        </Text>
        <NumericInput
          value={this.state.pointsPenalty}
          onChange={pointsPenalty => this.setState({ pointsPenalty })}
          rounded
          textColor='#4098ff'
          minValue={0}
          maxValue={perm.type.points}
        />
        <Button
          color='green'
          onPress={this.validateUser}
          title='Valider'
          icon={<Icon name='check' size={30} color='white' />}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 100
  },
  subtitle: {
    fontSize: normalize(15),
    marginTop: 20,
    marginBottom: 5,
    color: '#4098ff'
  },
  fullName: {
    marginTop: 10,
    fontSize: 30
  },
  surname: {
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    width: '90%',
    padding: 5,
    borderColor: '#4098ff',
    borderWidth: 2
  }
})

export default ValidateUser
