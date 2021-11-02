/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import RadioButtonExam from './Screen/practice/RadioButtonExam';
import todos from './Screen/practice/todos';
import NaverMap from './Screen/practice/NaverMap';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => RadioButtonExam);
//AppRegistry.registerComponent(appName, () => todos);