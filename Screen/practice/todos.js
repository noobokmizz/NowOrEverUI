import React from 'react';
import { ScrollView, Text } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from 'react-native-paper';

function Todos() {
  const ref = firestore().collection('todos');

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <ScrollView style={{flex: 1}}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={'New Todo'} onChangeText={() => {}} />
      <Button onPress={() => {}}>Add TODO</Button>
    </>
  );
}