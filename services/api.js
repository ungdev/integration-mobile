import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import config from '../config'
import moment from 'moment'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY
} from '../constants/StorageKey'
import { Alert } from 'react-native'

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
    console.log('EXPIRED TOKEN, TRYING TO REFRESH')
    return refreshAccessToken()
  }
}

export const refreshAccessToken = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refresh_token || refresh_token === '') {
      console.log('NO REFRESH TOKEN')
      return null
    }
    const res = await api.post(`oauth/token`, {
      grant_type: 'refresh_token',
      client_id: config.inte_client_id,
      client_secret: config.inte_client_secret,
      refresh_token,
      scope: ''
    })
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token)
    let expires_at = moment()
      .add(res.data.expires_in, 'seconds')
      .format('x')
    await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, expires_at)
    return res.data.access_token
  } catch (e) {
    if (e && e.response) console.log(e.response)
    else console.log(e)
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
    let expires_at = moment()
      .add(res.data.expires_in, 'seconds')
      .format('x')
    await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, expires_at)
    return res.data.access_token
  } catch (e) {
    if (
      e &&
      e.response &&
      e.response.data &&
      e.response.data.error &&
      e.response.data.error === 'invalid_credentials'
    ) {
      Alert.alert(
        "Erreur lors de l'identification",
        "L'identifiant ou le mot de passe fournit sont incorrects",
        [{ text: 'Ok' }]
      )
    } else if (e && e.response) console.log(e.response)
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
    console.log(res.data)
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY)
    await AsyncStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_KEY,
      moment(res.data.expires_at)
        .valueOf()
        .toString(10)
    )
  } catch (e) {
    if (e && e.response) console.log(e.response)
    else console.log(e)
  }
}

export const fetchUser = async (id = 0) => {
  // if fetch with id = 0, fetch himself
  const token = await getToken()
  const res = await api.get(`student/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchUsers = async (name = '') => {
  const token = await getToken()
  const res = await api.get(`student/autocomplete?name=${name}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchTeam = async id => {
  const token = await getToken()
  const res = await api.get(`team/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchTeams = async () => {
  const token = await getToken()
  const res = await api.get('team', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchCheckins = async () => {
  const token = await getToken()
  const res = await api.get('checkin', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
export const fetchCheckin = async id => {
  const token = await getToken()
  const res = await api.get(`checkin/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const createCheckin = async name => {
  const token = await getToken()
  const res = await api.post(
    `checkin`,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export const addUserToCheckin = async (id, uid, force = false) => {
  const token = await getToken()
  const res = await api.put(
    `checkin/${id}/student`,
    { uid, force },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export const removeUserToCheckin = async (id, uid) => {
  const token = await getToken()
  const res = await api.put(
    `checkin/${id}/student/remove`,
    { uid },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export const fetchPerms = async () => {
  const token = await getToken()
  const res = await api.get('perms', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
export const fetchAdminPerms = async () => {
  const token = await getToken()
  const res = await api.get('adminperms', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
export const fetchUserPerms = async () => {
  const token = await getToken()
  const res = await api.get('user/perms', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const validatePerm = async (id, userId, commentary, pointsPenalty) => {
  const token = await getToken()
  const res = await api.post(
    `perms/${id}/users/${userId}/present`,
    { commentary, pointsPenalty },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
export const sendCoord = async (lat, long) => {
  const token = await getToken()
  const res = await api.post(
    `coord`,
    { lat, long },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export const invalidatePerm = async (
  id,
  userId,
  commentary,
  pointsPenalty,
  absence_reason
) => {
  const token = await getToken()
  const res = await api.post(
    `perms/${id}/users/${userId}/absent`,
    { commentary, pointsPenalty, absence_reason },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
export const joinPerm = async (id, userId) => {
  const token = await getToken()
  const res = await api.post(
    `perms/${id}/join`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
export const leavePerm = async (id, userId) => {
  const token = await getToken()
  const res = await api.post(
    `perms/${id}/leave`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
export const addUsersToPerm = async (id, users) => {
  const token = await getToken()
  const res = await api.post(
    `perms/${id}/users`,
    { users },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
export const removeUserFromPerm = async (id, userId) => {
  const token = await getToken()
  const res = await api.delete(`perms/${id}/users/${userId}`, {
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

export const fetchEvents = async id => {
  const token = await getToken()
  const res = await api.get(`event?student=${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const setExpoPushToken = async pushToken => {
  try {
    const token = await getToken()
    const res = await api.post(
      `user/push-token`,
      {
        push_token: pushToken,
        device: Constants.deviceName,
        device_uid: Constants.deviceId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res
  } catch (e) {
    if (e && e.response) console.log(e.response)
    else console.log(e)
  }
  return null
}

export const sendNotification = async (targets, title, message) => {
  try {
    const token = await getToken()
    const res = await api.post(
      `notification`,
      { targets, title, message },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return res
  } catch (e) {
    console.log(e)
  }
  return null
}
