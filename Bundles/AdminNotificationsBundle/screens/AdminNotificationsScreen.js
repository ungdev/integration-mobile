import React from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { sendNotification } from '../../../services/api'
import Checkbox from '../../../components/Checkbox'
import Button from '../../../components/Button'

class UNG extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Envoyer une notification')

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      message: '',
      admin: true,
      ce: true,
      orga: true,
      is_newcomer: true
    }
  }

  sendNotification = () => {
    let targets = []
    const { admin, ce, orga, is_newcomer, title, message } = this.state
    if (admin) targets.push('admin')
    if (ce) targets.push('ce')
    if (orga) targets.push('orga')
    if (is_newcomer) targets.push('is_newcomer')
    if (targets.length === 4) targets = ['all']
    if (targets.length > 0) sendNotification(targets, title, message)
  }
  onChange = val => {
    console.log(val)
  }
  getAllStatus = () => {
    const { admin, orga, ce, is_newcomer } = this.state
    if (admin && orga && ce && is_newcomer) return 'true'
    if (!admin && !orga && !ce && !is_newcomer) return 'false'
    return 'undetermined'
  }
  allPressed = () => {
    if (this.getAllStatus() === 'true') {
      this.setState({
        ce: false,
        admin: false,
        orga: false,
        is_newcomer: false
      })
    } else {
      this.setState({
        ce: true,
        admin: true,
        orga: true,
        is_newcomer: true
      })
    }
  }
  render() {
    const { state } = this
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.p}>
          Vous pouvez ici envoyer des notifications aux utilisateurs de
          l'application. Il n'y a pas de limites, mais attention : si vous
          envoyez trop de notifications, vous risquez que certains utilisateurs
          les désactives. Ne jouez pas avec....
        </Text>
        <Checkbox
          title='Tous'
          checked={this.getAllStatus() === 'true'}
          undetermined={this.getAllStatus() === 'undetermined'}
          onPress={this.allPressed}
        />
        <Checkbox
          title='Administrateurs'
          checked={state.admin}
          onPress={() => this.setState({ admin: !state.admin })}
        />
        <Checkbox
          title='Orgas'
          checked={state.orga}
          onPress={() => this.setState({ orga: !state.orga })}
        />
        <Checkbox
          title="Chefs d'équipe"
          checked={state.ce}
          onPress={() => this.setState({ ce: !state.ce })}
        />
        <Checkbox
          title='Nouveaux'
          checked={state.is_newcomer}
          onPress={() => this.setState({ is_newcomer: !state.is_newcomer })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder='Titre de la notification'
            autoCapitalize='none'
            underlineColorAndroid='transparent'
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder='Contenu de la notification'
            autoCapitalize='none'
            underlineColorAndroid='transparent'
            onChangeText={message => this.setState({ message })}
          />
        </View>

        <Button onPress={this.sendNotification} title='Envoyer' />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  },
  p: {
    width: Dimensions.get('window').width * 0.95,
    padding: 1,
    marginBottom: 20
  },
  inputContainer: {
    borderBottomColor: '#FFFFFF',
    backgroundColor: '#00b5ec',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width * 0.95,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    flex: 1
  }
})

export default UNG
