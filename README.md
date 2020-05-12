# Low-cost-music-player

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/moonjaeshin161/react-native-music-player)

Low-cost-music-player is a music player app which built by a group of VNU's students. This app contains several useful abilities such as

  - Load music from your own device storage
  - Store your songs for free
  - Download your saved music whenever you want

## Tech

Low-cost-music-player uses a number of open source projects to work properly:

* [React Native] - Create native apps for Android and iOS !
* [React-Redux] - Support React Native storing states globally
* [React Native Navigation] - Routing and navigation for this app.
* [React Native Firebase] - Connect this app to Firebase conveniently.
  * [React Native Firebase/auth] - Manage user account and authenticate login/logout/register sessions
  * [React Native Firebase/firestore] - Save user info, avatar, and their song list.
  * [React Native Firebase/storage] - Store favorite songs and user's avatar
* [React-Native-vector-icons] - utilize icons from this library
* [React-native-i18n] - make this app become multilingual 
* [React-Native-flash-message] - display the message to users

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Low-cost-music-player requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies before start the app.

**`IOS emulator`**
```sh 
$ yarn or npm install
$ cd ios && pod install
$ npm run ios
```

**`Android emulator`**

```sh
First build with android studio
$ yarn or npm install
$ npm run android
```

### Errors

Some errors may occur in the first installation because of the limit of some above library

**`IOS`**

**RNReactNativeGetMusicFiles** pod failed to validate due to 1 error**
*Solution*: Go to the react-native-get-music-files in node modules and replace home in podspec with this
(dir: nodemodules/react-native-get-mussic-files/ios/RNReactNativeGetMusicFiles.podspec)
s.homepage = "https://github.com/cinder92/react-native-get-music-files"

**RNReactNativeTrackPlayer**   pod failed
*Solution* Go to the react-native-track-player in node modules and add this line in podspec 
(dir: nodemodules/react-native-track-player/react-native-track-player.podspec)
s.exclude_files = ["ios/RNTrackPlayer/Vendor/AudioPlayer/Example"]

**RNReactNativeTrackPlayer** null is not supported event types
*Solution* Go to the react-native-track-player in node mudules and add this line in the lib eventTypes
(dir: nodemodules/react-native-track-player/lib/eventTypes)
REMOTE_NEXT: 'remote-next',

**`Android`**
**Invalid file found (empty apk data).**
*Solution* remove *output.json* in the nodemodule of react-native-get-music-files
(dir node_modules/react-native-get-music-files/android/build/intermediates/manifest/androidTest/debug/output.json)

**Failed to install the app**. Make sure you have the Android development environment set up
*Solution* **Delete** the .idea folder in the root directory of the project and **Delete** all the .iml files in your project

**RNReactNativeTrackPlayer** null is not supported event types
*Solution* Go to the react-native-track-player in node mudules and add this line in the lib eventTypes
(dir: nodemodules/react-native-track-player/lib/eventTypes)
REMOTE_NEXT: 'remote-next',


### Contributors
 - Vu Dang Huy
 - Nguyen Cong Huynh
 - Hoang Thai Ha
 - Kieu Thanh Phong
 - Doan Doan Dai Hung

License
@All copyrights reserved
----


**Free Software, Hell Yeah!**


  

  
