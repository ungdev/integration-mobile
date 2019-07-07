import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native'
import { Card } from 'react-native-elements'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import ung from '../../../assets/images/ung.png'

class Events extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, "Projets de l'UNG", true)

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={ung} />
        <Text style={styles.p}>
          L'UNG organise de temps en temps des événements pour promouvoir ses
          activités et passer du bon temps ensemble. En voici une liste non
          exhaustive :
        </Text>
        <Card title="L'UTT Arena" image={require('../assets/ua.png')}>
          <Text style={{ marginBottom: 10 }}>
            L'UTT Arena est le plus gros événement de notre association. Il
            nécessite 11 mois de préparation, et se déroule chaque année en
            décembre. En 2018, c'était plus de 450 joueurs qui étaient venus au
            Cube, le centre d'exposition de Troyes, pour s'affronter sur des
            jeux comme League of Legends, Counter Strike ou Fortnite. Pendant
            48h non stop (même la nuit !), les joueurs ramènent leur PC, se
            branche au réseau que nous déployons et passent un bon moment.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            L'événement s'inclut dans le festival des jeux, une manifestation
            troyenne promouvant le jeu sous toutes ses formes : Jeux vidéos,
            jeux de rôle, jeux de plateau,... En 2018 c'était plus de 6000
            visiteurs sur les 3 jours
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Nous avons besoin d'un maximum d'étudiants bénévoles, afin que tout
            cela soit possible ! Que tu sois fortiche en réseau ou non, toute
            aide est bonne à prendre, alors n'hésite pas à nous contacter si tu
            souhaites rejoindre l'aventure !
          </Text>
        </Card>
        <Card title='Les Barcamps' image={require('../assets/barcamp.png')}>
          <Text style={{ marginBottom: 10 }}>
            Les barcamps sont des présentations sur des sujets libres, au format
            libre. Les présentateurs sont des étudiants, doctorants, enseignant
            ou encore des extérieurs à l'UTT.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Le sujet peut être en rapport avec une passion du présentateur, ou
            juste quelque chose qui l'intéresse. Parfois, certains présentateurs
            n'y connaissent rien dans leurs sujets, et décident pendant 2
            semaines de faire un maximum de recherches pour ensuite vous les
            partager.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            En plus, cela se déroule au foyer et on prépare généralement des
            croques, c'est la bonne ambiance ;)
          </Text>
        </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  },
  p: {
    width: Dimensions.get('window').width * 0.95,
    padding: 1
  },
  link: {
    color: '#00b5ec'
  }
})

export default Events
