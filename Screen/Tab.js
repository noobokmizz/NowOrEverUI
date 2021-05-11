import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Meet, Settings} from './TabScreens';
import {FriendList} from './FriendList';
import {BucketList} from './BucketList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Icon from "react-native-vector-icons/FontAwesome";

/*
const TabIcon=({name, size, color})=>{
    return <MaterialCommunityIcons name={name} size={size} color={color}/>;
};
*/

const Tab=createBottomTabNavigator();

const TabNavigation=()=>{
    return(
        <Tab.Navigator initialRouteName="Settings" >
            <Tab.Screen 
             name="FriendList"
             component={FriendList}
             options={{
                tabBarLabel: 'Friends',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
             }}
             />
            <Tab.Screen
             name="BucketList"
             component={BucketList}
             options={{
                tabBarLabel: 'BucketList',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="video" color={color} size={size} />
                  ),
             }}
            />
            <Tab.Screen 
            name="Settings" 
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={size} />
                  ),
             }}
            />
        </Tab.Navigator>
    );
};
export default TabNavigation;