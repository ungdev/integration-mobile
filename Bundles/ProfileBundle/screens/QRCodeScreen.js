import React from 'react'
import { StyleSheet, View } from 'react-native'
import QRCode from 'react-native-qrcode';

class QRCodeScreen extends React.Component {
  render() {
    const code = this.props.navigation.getParam('code')
    return (
      <View style={styles.container}>
        <QRCode
          value={`${code}`}
          size={300}
          bgColor='#00b5ec'
          fgColor='white'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
})

export default QRCodeScreen
