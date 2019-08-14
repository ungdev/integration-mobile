import React from 'react'
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { Card } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from 'react-native-paper'
import moment from 'moment'

const PermItem = props => {
  return (
    <TouchableOpacity onPress={props.navigate}>
      <Card style={[styles.card, { backgroundColor: props.color || 'white' }]}>
        <Card.Header
          title={props.type.name}
          extra={`Le ${moment(props.start * 1000).format(
            'DD/MM [de] HH:mm'
          )} à ${moment(props.end * 1000).format('HH:mm')}`}
        />
        <Card.Body style={styles.body}>
          <Text>{props.description}</Text>
          {(!props.open ||
            (props.open && moment(props.open * 1000).isAfter())) && (
            <Text style={{ color: 'red' }}>Cette perm est imposée</Text>
          )}
        </Card.Body>
        <Card.Footer
          content={`Lieu : ${props.place}`}
          extra={
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
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
      <List.Accordion
        title={`Permanenciers (${props.permanenciers.length}/${
          props.nbr_permanenciers
        })`}
        style={[styles.accordion, { backgroundColor: props.color }]}
      >
        {props.permanenciers.map(user => (
          <List.Item
            key={user.id}
            title={`${user.first_name} ${user.last_name}`}
            style={{ backgroundColor: props.color }}
          />
        ))}
      </List.Accordion>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    alignSelf: 'stretch',
    width: Dimensions.get('window').width * 0.95
  },
  body: {
    padding: 10
  },
  accordion: {
    marginTop: 0
  }
})

export default PermItem
