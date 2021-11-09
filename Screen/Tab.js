import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Meet, Settings} from './TabScreens';
import {FriendList} from './FriendList';
import {BucketList} from './BucketList';
import AddList from './AddList';
import Suggest from './Suggest';
import SearchDetailScreen from './SearchDetailScreen';
import RecommendScreen from './RecommendScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
const Stack = createStackNavigator();
const Tab=createBottomTabNavigator();


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

const TabNavigation=()=>{
    return(
        <Tab.Navigator initialRouteName="Bucket" >
            <Tab.Screen
             name="Bucket"
             component={Bucket}
             options={{
                tabBarLabel: 'BucketList',
                tabBarIcon: ({ color, size }) => (
                      <Icon name='newspaper-outline' size={size} color={color}/>
                  ),
             }}
            />
            <Tab.Screen 
             name="FriendList"
             component={FriendList}
             options={{
                tabBarLabel: 'Friends',
                tabBarIcon: ({ color, size }) => (
                  <Icon name='people-outline' size={size} color={color}/>
                  ),
             }}
             />
            <Tab.Screen 
            name="Settings" 
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                  <Icon name='settings-outline' size={size} color={color}/>
                   ),
             }}
            />
        </Tab.Navigator>
    );
};
export default TabNavigation;