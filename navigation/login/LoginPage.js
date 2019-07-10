import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { getToken } from '../../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'
import { newcomerLogin } from '../../services/api'
import Button from '../../components/Button'

class LoginPage extends React.Component {
  componentDidMount() {
    this.autoLogin()
    this.mount = true
  }
  componentWillUnmount() {
    this.mount = false
  }
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      fetch: true
    }
  }

  onClickListener = async viewId => {
    if (viewId === 'loginnew') {
      const token = await newcomerLogin(this.state.login, this.state.password)
      if (token) {
        this.props.navigation.navigate('Main')
      }
    }
    if (viewId === 'loginetu') {
      this.props.navigation.navigate('EtuLogin')
    }
  }

  autoLogin = async () => {
    try {
      console.log('Try Autologin with old credentials if exist')
      const token = await getToken()
      if (token) {
        console.log('Autologin successfull')
        this.props.navigation.navigate('Main')
      }
    } catch (e) {
      console.log(e)
    }
    if (this.mount) this.setState({ fetch: false })
  }

  login = () => this.props.navigation.navigate('EtuLogin')
  render() {
    if (this.state.fetch)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logointe.png')}
          style={{ width: 300, height: 300 }}
        />

        <Text style={styles.ancientText}>Pour les nouveaux :</Text>

        <View style={styles.inputContainer}>
          <Icon name='user' size={30} style={styles.inputIcon} color='#333' />
          <TextInput
            style={styles.inputs}
            placeholder='login (reçu par mail)'
            autoCapitalize='none'
            underlineColorAndroid='transparent'
            onChangeText={login => this.setState({ login })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name='lock' size={30} style={styles.inputIcon} color='#333' />
          <TextInput
            style={styles.inputs}
            placeholder='Mot de passe'
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <Button
          onPress={() => this.onClickListener('loginnew')}
          title='Connexion'
        />

        <Text style={styles.ancientText}>Pour les anciens :</Text>

        <Button
          onPress={() => this.onClickListener('loginetu')}
          title='Connexion avec le site étudiant'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  ancientText: {
    color: 'black',
    marginBottom: 10
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoginPage
