import React from 'react'
import { WebView } from 'react-native'
import { AsyncStorage } from 'react-native'
import { getToken, getEtuUTTLoginUrl, sendAuthorizationCode } from '../../services/api'

class EtuLoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.tryLogin(false)
    this.state = {
      uri: null
    }
  }

  componentDidMount() {
    this.getUri()
  }

  getUri = async () => {
    const uri = await getEtuUTTLoginUrl()
    this.setState({ uri })
  }

  tryLogin = async (redirect = true) => {
    try {
      const token = await getToken()
      if (token) {
        await this.getUserInformations()
        this.props.navigation.navigate('Main')
      } else {
        console.log('REDIRECT TO LOGIN')
        if (redirect) this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
      if (redirect) this.props.navigation.navigate('Login')
    }
  }

  getUserInformations = async () => {
    try {
      const user = await fetchUser()
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      this.props.screenProps.setUser(user)
    } catch (e) {
      console.log(e.response)
      this.logout()
    }
  }

  login = async url => {
    try {
      const authorization_code = url
        .split('?authorization_code=')[1]
        .split('&')[0]
      await sendAuthorizationCode(authorization_code)
      this.tryLogin()
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    console.log('render', this.state.uri)
    if (!this.state.uri) return null
    return (
      <WebView
        source={{
          uri: this.state.uri
        }}
        style={{ marginTop: 20 }}
        onLoadStart={e => {
          console.log('load', e.nativeEvent.url.split('?'))
          if (e.nativeEvent.url.indexOf('localhost:8100/?') !== -1) {
            if (e.nativeEvent.url.indexOf('authentification_canceled') === -1) {
              this.login(e.nativeEvent.url)
            } else {
              this.props.navigation.navigate('Login')
            }
          }
        }}
      />
    )
  }
}

export default EtuLoginPage
