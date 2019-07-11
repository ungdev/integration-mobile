import React from 'react'
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
      <Card.Footer
        content={<Text style={{ height: 30 }} />}
        extra={
          <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <Icon
              name='arrow-right'
              size={20}
              color='#4098ff'
              style={{ width: 20 }}
            />
          </View>
        }
      />
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
