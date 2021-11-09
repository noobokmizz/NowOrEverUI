import React, {useState,useEffect} from 'react';
import HTML from "react-native-render-html";
import Geolocation from '@react-native-community/geolocation';
import { 
    Text, 
    ScrollView, 
    useWindowDimensions,
    Linking, 
    View,
    Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {localhost} from '../App';
import { Gravity } from 'react-native-nmap';
import NaverMapView, {Align, Circle, Marker, Path, Polygon, Polyline} from "./practice/map";
import { TouchableOpacity } from 'react-native-gesture-handler';
//import Geolocation from 'react-native-geolocation-service';

const SearchDetailScreen = ({route}) => {
    const [bk_key,setBk_key]=useState({mem_idnum:1,bk_id:1});
    const [information,setInformation]=useState({name:'',address:'',call_number:'',url:'',star:0})
    const [startLocation,setStartLocation]=useState({latitude: 37.564362, longitude: 126.977011})
    const [endLocation,setEndLocation]=useState({latitude: 37.564362, longitude: 126.977011})
    
    useEffect(()=>{
        AsyncStorage.getItem('userInfo',(err,result)=>{
          const userInfo=JSON.parse(result);
          setBk_key({mem_idnum:userInfo.mem_idnum,bk_id:userInfo.bucketlist.bk_id});
        });
        console.log('route.params.lc_id:'+route.params.lc_id);
        console.log('category:'+route.params.category)
      },[]);

      useEffect(()=>{
        let mem_idnum=bk_key.mem_idnum;
        let bk_id=bk_key.bk_id;
        console.log('mem_idnum:'+mem_idnum);
        console.log('bk_id:'+bk_id);
        fetch('http://'+localhost+':8080/bucketlist/path?'+
        'mem_idnum='+mem_idnum+'&bk_id='+bk_id+'&lc_id='+route.params.lc_id,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        console.log('response:',responseJson);
        //console.log('responseJson.location.lc_name:'+responseJson.location.lc_name);
            setInformation({
                name:responseJson[0].location.lc_name,
                address:responseJson[0].location.lc_addr, 
                call_number:responseJson[0].location.lc_call_number, 
                url:responseJson[0].location.lc_url, 
                star:responseJson[0].rv_starrate
            })
            setEndLocation({latitude:parseFloat(responseJson[0].location.lc_y),longitude:parseFloat(responseJson[0].location.lc_x)})
        })
        .catch((error) => {
          console.error(error);
        })
      },[bk_key]);

    return(
        <View style={{
            //justifyContent: "center",
            alignItems: "center"}}>
            <View style={{width:300, borderBottomWidth:2, borderBottomColor:'gray', alignItems: "center"}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'bold',fontSize:50}}>{information.name}</Text>
            </View>
            <View>
                <Text>{route.params.category}</Text>
            </View>
            </View>
            <View style={{borderBottomWidth:2,borderBottomColor:'gray',height:130, marginTop:10}}>
            <View style={{flexDirection:'row',justifyContent: "center",width:300}}>
                <Icon name='star' size={30} color={'orange'}/>
                <Text style={{fontSize:25}}>{information.star}</Text>
            </View>
            <View>
                <Text style={{fontSize:20}}>주소:{information.address}</Text>
            </View>
            <View>
                <Text style={{fontSize:20}}>전화번호:{information.call_number}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 15}}>
                    링크:
                </Text>    
                {/*
                    <Text style={{color: 'blue', fontSize:15}}
                    onPress={() => Linking.openURL(information.url)}>
                {information.url}
                </Text>
                */}
                <TouchableOpacity onPress={() => Linking.openURL(information.url)}>
                <Image source={require('./assets/icons/kakaomap.png')}
                          style={{width:200, height:40}}
                          
                        />
                        </TouchableOpacity>
            </View>
            </View>
            <View style={{marginTop:10}}>
            <NaverMapView style={{
                        width: 350, height: 350
                    }}
                         showsMyLocationButton={true}
                         center={{...endLocation, zoom: 10}}
                         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={startLocation} onClick={() => console.warn('onClick! start')}/>
        <Marker coordinate={endLocation} pinColor="blue" onClick={() => console.warn('onClick! end')}/>
    
    </NaverMapView>
            </View>
        </View>
    );
};

export default SearchDetailScreen;