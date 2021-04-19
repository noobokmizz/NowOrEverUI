// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'aliceblue'}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Example of Main Screen
            {'\n\n'}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          NowOrEver
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;