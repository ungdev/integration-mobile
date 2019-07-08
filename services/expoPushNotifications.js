import { Permissions, Notifications } from 'expo'
import { setExpoPushToken } from './api'
import { Alert } from 'react-native'

const _handleNotification = notification => {
  console.log('NOTIFICATION', notification)
  if (notification.remote && notification.data && notification.data.title) {
    Alert.alert(notification.data.title, notification.data.message || '')
  }
}

export async function registerForExpoPushNotifications() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  console.log('NOTIFICATION STATUS :', finalStatus)
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()
  console.log('TOKEN', token)
  token = token.split('[')[1].split(']')[0]
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  Notifications.addListener(_handleNotification)
  return setExpoPushToken(token)
}
