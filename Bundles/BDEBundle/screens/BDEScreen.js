import React from 'react'
import {
  BackHandler,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { normalize } from '../../../services/font'
import bde from '../../../assets/images/bdeutt.png'
import Button from '../../../components/Button'
import { Divider } from 'react-native-elements'
import Card from '../../../components/Card'
import SocialButton from '../../../components/SocialButton'

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
      case 'website':
        Linking.openURL('https://bde.utt.fr/fr')
        break
      case 'partners':
        Linking.openURL('https://bde.utt.fr/fr/dashboard/benefits')
        break
      case 'mail':
        Linking.openURL('mailto:bde@utt.fr')
        break
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={bde} />
        <Text style={styles.blank} />
        <Text style={styles.bold}>
          Nous sommes le « Bureau des Étudiants » alias le "BDE". Le BDE est la
          principale association de l'école, composée d'étudiants bénévoles élus
          chaque année par tous les étudiants adhérents. Notre objectif est
          simple, faire bouger l'UTT en proposant à tous les étudiants pleins de
          services !
        </Text>
        <Text style={styles.p}>Le but du BDE est multiple :</Text>
        <Text style={styles.list}>
          {`\u2022 `}
          Fédérer tous les clubs et associations de l'école
        </Text>
        <Text style={styles.list}>
          {`\u2022`} Faire le lien avec l'administration
        </Text>
        <Text style={styles.list}>
          {`\u2022`} Gérer le foyer, Buck'utt, Zeshop....
        </Text>
        <Text style={styles.list}>{`\u2022`} Organisation d'événements</Text>
        <Text style={styles.bold}>Alors pourquoi cotiser au BDE ?</Text>
        <Text style={styles.list}>
          {`\u2022 `}
          Tu pourras venir prendre tes petites collations au foyer ou acheter
          des fournitures au Zeshop.
        </Text>
        <Text style={styles.list}>
          {`\u2022`} Tu auras des réductions lors des nombreux événements de
          l'année...
        </Text>
        <Text style={styles.list}>
          {`\u2022`} Tu pourras retrouver tes amis aux afterworks qui se
          déroulent toute l'année.
        </Text>
        <Text style={styles.list}>
          {`\u2022`} Ou encore louer du matériel comme des tentes ou des
          appareils à raclette.
        </Text>
        <Button
          onPress={() => this.onClickListener('website')}
          title='Aller sur le site'
        />
        <Divider style={{ width: '90%' }} />
        <Text style={styles.bold}>
          Voici quelques événements organisés par le BDE :
        </Text>
        <Card
          title='R2D (Remise des diplômes)'
          image={require('../assets/r2d.jpg')}
        >
          Jour de gloire des jeunes diplômés, c'est la plus grosse soirée du
          semestre d’automne.
        </Card>
        <Card
          title='Intégration'
          image={require('../../../assets/images/icon.png')}
        >
          Tu la connais, t'es en train de la vivre ! et ben ça aussi c'est ton
          BDE qui l'organise.
        </Card>
        <Card title='Village Estival' image={require('../assets/village.png')}>
          Petite après-midi au bord du lac, avec pleins d'activités organisées,
          histoire de fêter la fin de l'année.
        </Card>
        <Card title='Soirée des finaux' image={require('../assets/winter.png')}>
          Tu vas bientôt connaitre les cours à l'UTT, mais qui dit cours dit
          examens. Mais t'en fait pas, on a prévu pour toi la soirée qui te
          permettra de les oublier.
        </Card>
        <Divider style={{ width: '90%' }} />
        <Text style={styles.bold}>
          Etre cotisants au BDE c'est aussi pleins d'avantages en dehors de
          l'école.
        </Text>
        <Text style={styles.p}>
          Retrouve tous nos partenaires juste en dessous !
        </Text>
        <Button
          onPress={() => this.onClickListener('partners')}
          title='Nos partenaires'
        />
        <Divider style={{ width: '90%' }} />
        <Text style={styles.bold}>
          N'hésites pas à nous contacter ou à nous suivre sur les réseaux
        </Text>
        <View style={styles.social}>
          <SocialButton
            type='facebook'
            link='https://www.facebook.com/bde.utt/'
          />
          <SocialButton
            type='instagram'
            link='https://www.instagram.com/bdeutt/?hl=fr'
          />
          <SocialButton
            type='envelope'
            action={() => this.onClickListener('mail')}
          />
          <SocialButton
            type='link'
            link='https://bde.utt.fr/fr'
            backgroundColor='green'
          />
        </View>
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
    fontSize: normalize(15),
    width: '95%',
    padding: 2,
    marginTop: 10
  },
  bold: {
    fontSize: normalize(20),
    width: '95%',
    padding: 2,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  },
  list: {
    fontSize: normalize(15),
    width: '90%',
    padding: 2,
    marginLeft: 10
  },
  link: {
    color: '#00b5ec'
  },
  blank: {
    marginBottom: 10
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})

export default UNG
