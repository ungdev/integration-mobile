import axios from 'axios'
import { AsyncStorage } from 'react-native'
import config from '../config'
import moment from 'moment'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY
} from '../constants/StorageKey'

const api = axios.create({
  baseURL: config.inte_url
})

export const getToken = async () => {
  const expiration_date = await AsyncStorage.getItem(
    ACCESS_TOKEN_EXPIRATION_KEY
  )

  if (
    expiration_date !== null &&
    moment().isBefore(parseInt(expiration_date))
  ) {
    let token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
    return token
  } else {
    return refreshAccessToken()
  }
}

export const refreshAccessToken = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
    if (refresh_token === '') return null
    const res = await api.post(`oauth/token`, {
      grant_type: 'refresh_token',
      client_id: config.inte_client_id,
      client_secret: config.inte_client_secret,
      refresh_token,
      scope: ''
    })
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token)
    let expires_in = res.data.expires_in * 1000
    await AsyncStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      expires_in.toString(10)
    )
    return res.data.access_token
  } catch (e) {
    console.log(e)
    throw 'NO_TOKEN'
  }
}

export const newcomerLogin = async (login, password) => {
  try {
    const res = await api.post(`oauth/token`, {
      grant_type: 'password',
      client_id: config.inte_client_id,
      client_secret: config.inte_client_secret,
      username: login,
      password,
      scope: ''
    })
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token)
    let expires_in = res.data.expires_in * 1000
    await AsyncStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      expires_in.toString(10)
    )
    return res.data.access_token
  } catch (e) {
    //todo check if e.response.data.error == "invalid_credentials" and print error
    if (e && e.response) console.log(e.response)
    else console.log(e)
  }
  return null
}

export const getEtuUTTLoginUrl = async () => {
  try {
    const res = await api.get(`oauth/etuutt/link`)
    return res.data.redirectUri
  } catch (e) {
    if (e && e.response) console.log(e.response)
    else console.log(e)
  }
  return null
}

export const sendAuthorizationCode = async authorization_code => {
  try {
    const res = await api.post(`oauth/etuutt/callback`, {
      authorization_code
    })
    console.log('RESULT', res.data)
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, '')
    await AsyncStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      moment(res.data.expires_at.date)
        .valueOf()
        .toString(10)
    )
  } catch (e) {
    if (e && e.response) console.log(e.response)
    else console.log(e)
  }
}

export const fetchUser = async () => {
  const token = await getToken()
  const res = await api.get('student/0', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchFactions = async () => {
  const token = await getToken()
  const res = await api.get('factions', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchPoints = async () => {
  const token = await getToken()
  const res = await api.get('points', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchEvents = async (id) => {
  const token = await getToken()
  const res = await api.get(`event?student=${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const setExpoPushToken = async pushToken => {
  const token = await getToken()
  const res = await api.post(
    `private/user/push-token`,
    { token: pushToken },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res
}
