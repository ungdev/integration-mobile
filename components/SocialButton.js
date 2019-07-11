import React from 'react'
import { SocialIcon } from 'react-native-elements'
import { WebBrowser } from 'expo'

const openModal = async link => await WebBrowser.openBrowserAsync(link)

const SocialButton = props => {
  if (!props.link) return null
  console.log('SOCIALBUTTON')
  return (
    <SocialIcon
      type={props.type}
      onPress={() => openModal(props.link)}
      onLongPress={() => openModal(props.link)}
    />
  )
}

export default SocialButton
