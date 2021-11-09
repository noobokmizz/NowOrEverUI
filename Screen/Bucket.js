import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BucketList} from './BucketList';
import AddList from './AddList';
import SearchDetailScreen from './SearchDetailScreen';
import RecommendScreen from './RecommendScreen';

const Stack = createStackNavigator();

const Bucket = () => {
    // Stack Navigator for List and Add List
    return (
      <Stack.Navigator initialRouteName="BucketList">
        <Stack.Screen
          name="BucketList"
          component={BucketList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddList"
          component={AddList}
          options={{
            title: 'Add to Bucket List', //Set Header Title
            headerStyle: {
              backgroundColor: 'aqua', //Set Header color
            },
            headerTintColor: 'blue', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
         <Stack.Screen
          name="SearchDetailScreen"
          component={SearchDetailScreen}
          options={{
            title: 'Detail', //Set Header Title
            headerStyle: {
              backgroundColor: 'aqua', //Set Header color
            },
            headerTintColor: 'blue', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="RecommendScreen"
          component={RecommendScreen}
          options={{
            title: 'Recommend', //Set Header Title
            headerStyle: {
              backgroundColor: 'aqua', //Set Header color
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

  export default Bucket;