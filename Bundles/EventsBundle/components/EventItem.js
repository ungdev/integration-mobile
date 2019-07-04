import React from 'react'
import { Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from '@ant-design/react-native'
import moment from 'moment'

const EventItem = props => (
  <TouchableOpacity onPress={props.navigate}>
    <Card style={styles.card}>
      <Card.Header
        title={props.name}
        extra={`Le ${moment(props.start_at * 1000).format('DD/MM [à] HH:mm')}`}
      />
      <Card.Body style={styles.body}>
        <Text>{props.description}</Text>
      </Card.Body>
    </Card>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.95
  },
  body: {
    padding: 10
  }
})

export default EventItem
