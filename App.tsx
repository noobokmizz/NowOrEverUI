// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React, {useEffect, useState} from 'react';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import TabNavigation from './Screen/Tab';
//import Bucket from './Screen/Bucket';

const Stack = createStackNavigator();

export const localhost='15.164.123.22'; //aws
//export const localhost='192.168.238.63'; //학교
//export const localhost='192.168.35.57'; //집

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: '회원가입', //Set Header Title
          headerStyle: {
            backgroundColor: 'lightskyblue', //Set Header color
          },
          headerTintColor: 'blue', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = () => {

  useEffect(() => {
    console.log('waiting firebase message');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log("arrive message!");
    });

    return unsubscribe;
  }, []);
  
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        
        {/* SplashScreen which will come once for 5 Seconds*/ }
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator which includer Login Signup will come once*/ }
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
         name="TabNavigation"
         options={{headerShown: false}}
         component={TabNavigation} />
        {/* Navigation Drawer as a landing page */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;