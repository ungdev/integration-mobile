import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as Permissions from 'expo-permissions'
import { fetchUser } from '../../../services/api'

import { BarCodeScanner } from 'expo-barcode-scanner'

class ScanScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    loading: false
  }

  async componentDidMount() {
    this.getPermissionsAsync()
  }

  handleBarCodeScanned = async data => {
    this.setState({ loading: true })
    try {
      const user = await fetchUser(data.data)
      this.props.navigation.pop()
      this.props.navigation.getParam('callback')(user)
    } catch (e) {
      console.log(e.response || e)
    }
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  render() {
    const { hasCameraPermission, scanned } = this.state

    if (hasCameraPermission === null) {
      return <Text>Demande de permission en cours...</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>Accès à la caméra refusée :/</Text>
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    )
  }
}

export default ScanScreen
