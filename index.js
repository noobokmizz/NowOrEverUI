/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
//import App from './Screen/practice/NaverMap';
import RadioButtonExam from './Screen/practice/RadioButtonExam';
import todos from './Screen/practice/todos';
import NaverMap from './Screen/practice/NaverMap';
import CurrentPosition from './Screen/practice/Geolocation';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }
AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => CurrentPosition);
//AppRegistry.registerComponent(appName, () => RadioButtonExam);
//AppRegistry.registerComponent(appName, () => todos);
