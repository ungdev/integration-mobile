import React from 'react'
import {
  BackHandler,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import ung from '../../../assets/images/ung.png'
import Button from '../../../components/Button'

class UNG extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'UTT Net Group')

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  onClickListener = id => {
    switch (id) {
      case 'events':
        this.props.navigation.navigate('UNGEvents')
        break
      case 'projects':
        this.props.navigation.navigate('Projects')
        break
      case 'contact':
        Linking.openURL('mailto:ung@utt.fr')
        break
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={ung} />
        <Text style={styles.p}>
          L'UTT Net Group (UNG pour les intimes ;) ) est l'association
          d'informatique de l'UTT.
        </Text>
        <Text style={styles.p}>
          Nous fournissons des services informatiques aux étudiants et
          assocations. Nous avons notre propre salle remplie de serveurs bien
          badass, et on développe pas mal d'outils comme des sites webs que tu
          utiliseras quotidiennement. Par exemple le site étudiant, le site de
          l'intégration ou même cette application que tu es en train d'utiliser
          !
        </Text>
        <Button
          onPress={() => this.onClickListener('projects')}
          title='Voir les projets'
        />
        <Text style={styles.p}>
          L'UNG c'est aussi une grosse part d'événementiel, avec notamment l'UTT
          Arena, une LAN (compétition de jeux vidéo) de plus de 450 joueurs !
        </Text>
        <Button
          onPress={() => this.onClickListener('events')}
          title='Voir les événements'
        />
        <Text style={styles.p}>
          Voilà, si tu as des questions ou si tu souhaites rejoindre
          l'association, n'hésites pas à venir nous voir, ou même à nous
          contacter directement avec ce bouton :
        </Text>
        <Button
          onPress={() => this.onClickListener('contact')}
          title='Nous contacter'
        />
        <Text style={styles.p}>
          Retrouve toutes ces informations sur notre site internet,
          <Text
            style={styles.link}
            onPress={() => LinkingIOS.openURL('https://ung.utt.fr')}
          >
            {' '}
            https://ung.utt.fr
          </Text>
        </Text>
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

export default UNG
