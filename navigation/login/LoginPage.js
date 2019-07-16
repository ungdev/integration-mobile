import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../components/Button'
import EtuLoginPage from './EtuLoginPage'
import {
  getToken,
  sendAuthorizationCode,
  newcomerLogin
} from '../../services/api'

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
      fetch: true,
      modalVisible: false
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
      this.setState({ modalVisible: true })
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

  closeModal = (url = null) => {
    console.log('CLOSE')
    this.setState({ modalVisible: false, fetch: true })
    if (url) this.login(url)
  }

  login = async url => {
    try {
      console.log('URL', url)
      const authorization_code = url
        .split('?authorization_code=')[1]
        .split('&')[0]
      await sendAuthorizationCode(authorization_code)
      this.autoLogin()
    } catch (e) {
      console.log(e)
      this.setState({ fetch: false })
    }
  }

  render() {
    if (this.state.fetch)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <EtuLoginPage
          visible={this.state.modalVisible}
          closeModal={this.closeModal}
        />
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
