import React from 'react'
import { SocialIcon } from 'react-native-elements'
import { WebBrowser } from 'expo'

const openModal = async link => await WebBrowser.openBrowserAsync(link)

const SocialButton = props => {
  if (!props.link && !props.action) return null
  return (
    <SocialIcon
      type={props.type}
      onPress={() => {
        if (props.action) props.action()
        else openModal(props.link)
      }}
      style={
        props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
      }
    />
  )
}

export default SocialButton
