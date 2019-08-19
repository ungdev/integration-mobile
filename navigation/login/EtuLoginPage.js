import React from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native'
import { getEtuUTTLoginUrl } from '../../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'

class EtuLoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: null
    }
  }

  componentDidMount() {
    this.getUri()
  }

  getUri = async () => {
    this.uri = await getEtuUTTLoginUrl()
    this.setState({ uri: this.uri })
  }

  render() {
    let WebViewRef = null
    if (!this.state.uri) return null
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.visible}
        onRequestClose={() => this.props.closeModal()}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.closeModal()}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Text style={{ color: '#4098ff' }}>fermer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => WebViewRef.reload()}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Icon name='refresh' size={20} color='#4098ff' />
            </TouchableOpacity>
          </View>
          <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            source={{
              uri: this.state.uri
            }}
            onLoadStart={e => {
              console.log('load', e.nativeEvent.url)
              if (e.nativeEvent.url.indexOf('http://etu.utt.fr/user') !== -1) {
                this.setState({ uri: this.uri })
              }
              if (e.nativeEvent.url.indexOf('http://etu.utt.fr/') !== -1) {
                this.setState({ uri: this.uri })
              }
              if (e.nativeEvent.url.indexOf('localhost:8100/?') !== -1) {
                if (
                  e.nativeEvent.url.indexOf('authentification_canceled') === -1
                ) {
                  this.props.closeModal(e.nativeEvent.url)
                } else {
                  this.props.navigation.navigate('Login')
                }
              }
            }}
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default EtuLoginPage
