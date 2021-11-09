import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import NaverMapView, {Align, Circle, Marker, Path, Polygon, Polyline} from "./map";
import {Image, ImageBackground, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import { LayerGroup } from './map/index';
import Geolocation from 'react-native-geolocation-service';
/*
const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
const P4 = {latitude: 37.564834, longitude: 126.977218};
const P5 = {latitude: 37.562834, longitude: 126.976218};
*/
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}

const HomeScreen = () =>
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MyMap}/>
        <Tab.Screen name={"text"} component={TextScreen}/>
    </Tab.Navigator>

const TextScreen = () => {
    return <Text>text</Text>
}

const MyMap = ({navigation}) => {
    const P0 = {latitude: 37.564362, longitude: 126.977011};
    const P1 = {latitude: 37.565051, longitude: 126.978567};
    const P2 = {latitude: 37.565383, longitude: 126.976292};
    const [location, setLocation] = useState({latitude: 37.564362, longitude: 126.977011});

    useEffect(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({
              latitude:latitude,
              longitude:longitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }, []);

    return <NaverMapView style={{width: '100%', height: '100%'}}
                         showsMyLocationButton={true}
                         center={{...location, zoom: 16}}
                         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={location} onClick={() => console.warn('onClick! p0')}/>
        <Marker coordinate={location} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
    
    </NaverMapView>
}

export default App;