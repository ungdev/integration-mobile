import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { createCheckin } from '../../../services/api'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { normalize } from '../../../services/font'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../components/Button'

class CreateCheckin extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Créer une liste', true)

  constructor(props) {
    super(props)
    this.state = {
      name: null
    }
  }
  submitForm = async () => {
    try {
      const { name } = this.state
      if (!name || name.length === 0) {
        Alert.alert('Vous devez entrer un nom pour cette liste', [
          { text: 'Ok' }
        ])
        return
      }
      const checkin = await createCheckin(name)
      this.props.navigation.pop()
      this.props.navigation.getParam('callback')(checkin)
    } catch (e) {
      console.log(e.response || e)
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.p}>
          Attention ! Ne créez une nouvelle liste que si la situation l'exige,
          c'est à dire si vous souhaitez noter la présence de nouveaux mais que
          la liste n'est pas déjà créée. Par exemple, toutes les listes de bus
          sont déjà pré créée.
        </Text>
        <Text style={styles.blank} />
        <Text style={styles.p}>
          Le simbole{' '}
          <Icon name='list' size={20} color='#4098ff' style={{ width: 20 }} />{' '}
          est devant toutes les listes générée automatiquement dans la liste,
          celle qui n'en ont pas sont donc créée avec ce formulaire.
        </Text>

        <Text style={styles.subtitle}>Nom de la liste</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <Button
          onPress={this.submitForm}
          title='Créer la liste'
          icon={<Icon name='plus' size={30} color='white' />}
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
  subtitle: {
    fontSize: normalize(10),
    marginTop: 20,
    marginBottom: 5
  },
  input: {
    width: '90%',
    padding: 5,
    borderColor: '#4098ff',
    borderWidth: 2
  },
  blank: {
    marginBottom: 20
  }
})

export default CreateCheckin
