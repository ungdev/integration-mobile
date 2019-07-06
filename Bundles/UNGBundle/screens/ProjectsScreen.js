import React from 'react'
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Card } from 'react-native-elements'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import ung from '../../../assets/images/ung.png'

class Projects extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, "Projets de l'UNG", true)

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={ung} />
        <Text style={styles.p}>
          Tous les projets de l'UNG sont disponible sur notre github, tu peux
          les consulter ici :
        </Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.button]}
          onPress={() => Linking.openURL('https://github.com/ungdev')}
        >
          <View style={styles.buttonContent}>
            <Icon name='github' size={30} color='white' style={styles.icon} />
            <Text style={styles.buttonText}>Aller sur le github</Text>
          </View>
        </TouchableHighlight>

        <Text style={styles.p}>
          Ci-dessous une liste incomplète des projets sur lesquelles nous
          travaillons (et pourquoi pas toi aussi ?) :
        </Text>
        <Card
          title="SIA (Système d'Information des Associations)"
          image={require('../assets/sia.png')}
        >
          <Text style={{ marginBottom: 10 }}>
            Le SIA ou Système d'Information des Associations est le système
            d'information que gère l'UNG. En d'autres mots, cela englobe tous
            les systèmes que nous gérons, les sites webs, les outils
            informatiques, le réseau des associations,...
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Nous possédons nos propres serveurs avec des capacités très élevés,
            par exemple nous avons plus de 700 Go de RAM, 30 To de stockage et
            200 CPU. Ces performances servent une architecture virtualisée. Nous
            pouvons donc créer des machines virtuelles à tout moment pour
            répondre à un besoin.
          </Text>
        </Card>
        <Card
          title="Site d'intégration"
          image={require('../../../assets/images/logointe.png')}
        >
          <Text style={{ marginBottom: 10 }}>
            Le site de l'intégration permet de faciliter beaucoup de procédures
            pour l'organisation de l'intégration. Gestion des parains, gestion
            des CEs, gestion des bus,...
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Beaucoup de fonctionnalités ont été ajoutés, et il en reste beaucoup
            d'autre, le site est en continuelle évolution !
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Le tout est développé en Laravel pour le site, et en React Native
            pour l'application (oui cette application que tu es en train
            d'utiliser ;))
          </Text>
        </Card>
        <Card title='Le site étudiant' image={require('../assets/etu.png')}>
          <Text style={{ marginBottom: 10 }}>
            Le site étudiant (
            <Text
              style={styles.link}
              onPress={() => LinkingIOS.openURL('https://etu.utt.fr')}
            >
              https://etu.utt.fr
            </Text>
            ) est TON site étudiant. Tu y retrouveras ton emploi du temps
            téléchargeable au format iCalendar, les prochains événements
            étudiants (également implémentable dans ton agenda), les photos des
            événements prises par l'association de photo de l'UTT : Argentique.
            Mais aussi un trombinoscope afin de retrouver la petite zoulette
            avec qui tu as pu zouker lors de la dernière soirée, ou encore la
            liste de toutes les associations qui pourraient t'intéresser (même
            si on sait que l'UNG c'est mieux).
          </Text>
          <Text style={{ marginBottom: 10 }}>
            C'est un projet très complet et très utilisé, et beaucoup de choses
            sont à faire ou améliorer dessus. Il faut juste ne pas être timide
            et se lancer un grand coup ;)
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Le site est développé en Symfony, un framework de PHP.
          </Text>
        </Card>
        <Card
          title="Site de l'UTT Arena et l'appli"
          image={require('../assets/arena.png')}
        >
          <Text style={{ marginBottom: 10 }}>
            Le site de l'UTT Arena (
            <Text
              style={styles.link}
              onPress={() => LinkingIOS.openURL('https://arena.utt.fr')}
            >
              https://arena.utt.fr
            </Text>
            ) permet de gérer les inscriptions des joueurs à la LAN. Une fois
            inscrit, ils peuvent créer une équipe et rejoindre un tournoi. De
            plus, il s'agit d'une vitrine pour l'événement, afin de donner envie
            aux joueurs de s'inscrire.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Ensuite, il y a l'application de l'UA,{' '}
            <Text
              style={styles.link}
              onPress={() => LinkingIOS.openURL('https://uttarena.app')}
            >
              https://uttarena.app
            </Text>{' '}
            qui permet aux joueurs d'accéder à des informations avant et pendant
            la LAN. Par exemple, ils peuvent savoir qui seront leurs prochains
            adversaires (via l'API de toornament).
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Enfin, il y a l'application bouffe. Cette application ressemble un
            peu à l'interface d'un vendeur de chez macdo, on sélectionne des
            items, par exemple une pizza, et une fois la commande validée, la
            préparation est lancée en cuisine. Cela permet de faciliter la
            communication dans la cuisine, et d'avoir un suivit des commandes.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Ces trois applications sont développés en ReactJS avec nodeJS.
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
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: 250,
    borderRadius: 30
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  link: {
    color: '#00b5ec'
  },
  button: {
    backgroundColor: '#00b5ec'
  },
  buttonText: {
    color: 'white',
    marginLeft: 20
  }
})

export default Projects
