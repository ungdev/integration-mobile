# Integration Mobile

## Requirement :

* React Native with expo

## Installation :

1. Clone repository
```
git clone https://github.com/ungdev/integration-mobile.git
cd integration-mobile
```
2. Copy config file and edit it
```
cp config.js.example config.js
nano config.js
```

3. Install dependencies :
If not yet install yarn : 
**Debian / Ubuntu **
```
sudo apt-get update && sudo apt-get install yarn
```
**MacOs**
```
brew install yarn
```
**Windows**
https://yarnpkg.com/latest.msi

Then run :
```
yarn
```
4. Launch the app on expo :
```
yarn start
```

## File Architecture :

* /assets/* => all font, images, files used in the app globally
* /components/* => all react components that can be reused multiple times
* /constants/* => to be replaced by /theme/*, store theme information like colors etc
* /navigation/* => handle app navigation, where the user should be redirected, not the actual content
* /Bundles/* => all the app's bundles, for example, UEBundle handle everything about UEs. One folder = One bundle (see 'Create a bundle')
* /node_modules/* => dependencies, dont touch it
* /screens/* => pages, content, etc (other than bundles')
* App.js => entry point of the app
* app.json => app infos, like version (it's important to increase it when you publish a new version)
* config.js(.example) => configuration file for globale static variables (like integration's link)
* README.md => this file


## Create a bundle

* Create the folder Bundles/NameOfYourBundleBundle
* Create the bundle entry point, usually "Main.js" in that folder
* Do whatever you want in that folder, add tabs, functionnalities...
* Dont forget to implement a return button on the top left corner to return to main menu
* Go to navigation/AppNavigator.js => add your Bundle in the list
* Go to navigation/MainMenu.js => add a button to your app with destination equal to the Bundle name in AppNavigator

## Publish on apple store

Before doing anything, be sure your code is safe, and upgrade version in app.json (dont forget to change versionCode too at the end of this file for android)
For version naming use the following rules :
First number is for complete refactor or new years, in 2019 it was 3 (1.0.0 was the first Ionic app in 2017, 2.0.0 was the same Ionic app in 2018 and 3.0.0 was the 2019 refactor in React Native)
Second number is for current version, increase each new publication
The third number is the publication attempts, if apple refuse your app or if you just fix a bug you created in the current version, increase this number. Set it to 0 each time the second number increases.

```
yarn build:ios
yarn upload:ios
```
You will need many files, like an apns_key.p8 for example, ask everything to the last owner (Arnaud DUFOUR arnaud-dufour@hotmail.fr on 08/2019)
The second command will ask you to log in to your account on app store connect, you must have the rights on the project.
Expo require an application specific password to communicate with the store. You will generate it the first time you launch the command, store it somewhere safe (it will be asked everytime you publish a new version)
Once the upload is over (it can take several minutes), go to https://appstoreconnect.apple.com, then to my apps and select Integration UTT in the list.
Click on the button "Version or plateform", give it a name like "vX.X.X" and then go to that version. Fill every form, and on the build section select the build expo uploaded.


**Your build is not there ?**
1. Maybe the upload is not finished
Even if expo tells you he is over, apple check the binary before you can see it in the dashboard. You will receive a mail from apple telling you when it's ok
2. Maybe Apple's check failed
You will receive a mail telling you what's wrong with the binary. Its not a functionnal test, juste a code test to see if you've declared everything right, like camera usage or location.

When you're all done, submit your version, check no then yes, and fill every checkbox for add usage except the first one.
Submit and you're done ! Apple will send you a mail when the app is ready for sale, or not if there's a problem with the app. It can take some days, be patient.

## Publish on play store

```
yarn build:android
```
When build is over, download the apk. Go to https://play.google.com/apps/publish
Go to Integration UTT
On the left, Manage Publication > Version dashboard (Gestion de la publication > Tableau de bord de la version)
On the right, Manage Version
For the production version, click on "manage"
Click on "Create a version"
Upload the apk

## Icons

* you can see all icons usable here : https://oblador.github.io/react-native-vector-icons/
