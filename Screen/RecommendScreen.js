import React, {useState,useEffect} from 'react';
import HTML from "react-native-render-html";
import {theme} from './src/theme';
import { 
    Text, 
    StatusBar,
    ScrollView, 
    useWindowDimensions,
    StyleSheet,
    CheckBox,
    Linking, 
    View,
    Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {localhost} from '../App';
import { Gravity } from 'react-native-nmap';
import NaverMapView, {Align, Circle, Marker, Path, Polygon, Polyline} from "./practice/map";
import { TouchableOpacity } from 'react-native-gesture-handler';
import category_images from './assets/icons/category_images';
import Geolocation from 'react-native-geolocation-service';
import {
    sqrt,abs,round
  } from 'mathjs'
  import styled, {ThemeProvider} from 'styled-components/native';

const RecommendScreen = ({route}) => {
    const [bk_key,setBk_key]=useState({mem_idnum:1,bk_id:1});
    const [information,setInformation]=useState({name:'',address:'',call_number:'',url:'',star:0})
    const [startLocation,setStartLocation]=useState({latitude: 37.564362, longitude: 126.977011}) // tmp code (임시 확인용)
	//const [startLocation,setStartLocation]=useState({latitude: 37.5715, longitude: 126.9050}) // src code 
    const [endLocation,setEndLocation]=useState({latitude: 37.564362, longitude: 126.977011})
    const [center,setCenter]=useState({latitude: 37.564362, longitude: 126.977011})
    const [zoom,setZoom]=useState(5);
    const [status,setStatus]=useState(0);
    //let categoryId=route.params.category_id.toString();

    useEffect(()=>{
        AsyncStorage.getItem('userInfo',(err,result)=>{
          const userInfo=JSON.parse(result);
          setBk_key({mem_idnum:userInfo.mem_idnum,bk_id:userInfo.bucketlist.bk_id});
        });
        
        Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setStartLocation({
                latitude:latitude,
                longitude:longitude
              });
              console.log('현재 위치 받기 성공');
            },
            error => {
              console.log('현재 위치 받기 실패');
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        //console.log('route.params.lc_id:'+route.params.lc_id);
        //console.log('category:'+route.params.category);
      },[]);

      useEffect(()=>{
          //if(startLocation.latitude==37 && startLocation.longitude==126) return;
        let mem_idnum=bk_key.mem_idnum;
        let bk_id=bk_key.bk_id;
        let cur_x,cur_y;
        //cur_x=toString(startLocation.longitude);
        //cur_y=toString(startLocation.latitude);
        cur_x=(startLocation.longitude);
        cur_y=(startLocation.latitude);
        console.log('mem_idnum:'+mem_idnum);
        console.log('bk_id:'+bk_id);
        console.log('cur_x:'+cur_x+'cur_y:'+cur_y);
        fetch('http://'+localhost+':8080/bucketlist/recommendation?'+
        'mem_idnum='+mem_idnum+'&bk_id='+bk_id
        +'&cur_x='+cur_x+'&cur_y='+cur_y
        ,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      })
      .then((response) => response.json())
      .then((responseJson)=>{
          console.log('url:'+'http://'+localhost+':8080/bucketlist/recommendation?'+
          'mem_idnum='+mem_idnum+'&bk_id='+bk_id
          +'&cur_x='+startLocation.longitude+'&cur_y='+startLocation.latitude);
        console.log('response:',responseJson);
            if(responseJson.length==0){
              setStatus(2);
            }
            else{
              setStatus(1);
              setInformation({
                  name:responseJson[0].location.lc_name,
                  address:responseJson[0].location.lc_addr, 
                  call_number:responseJson[0].location.lc_call_number, 
                  url:responseJson[0].location.lc_url, 
                  star:responseJson[0].rv_starrate,
                  category:responseJson[0].category,
                  category_id:responseJson[0].location.locationId.lc_category,
              })
              setEndLocation({latitude:parseFloat(responseJson[0].location.lc_y),longitude:parseFloat(responseJson[0].location.lc_x)})
          }
        })
        .catch((error) => {
          console.error(error);
        })
      },[bk_key,startLocation]);

      useEffect(()=>{
        setCenter({latitude:(startLocation.latitude+endLocation.latitude)/2,longitude:(startLocation.longitude+endLocation.longitude)/2});
        let latitude=abs(startLocation.latitude-endLocation.latitude)*16000;
        let longitude=abs(startLocation.longitude-endLocation.longitude)*16000;
        console.log('latitude:'+latitude+' longitude'+longitude);
        let dist=sqrt(latitude*latitude+longitude*longitude);
        console.log('dist:'+dist);
        
        let zoom;
        if(dist==0)
          zoom=14;
        else
          zoom=Math.log2(2000000/dist);
        
        console.log('before 반올림 zoom:'+zoom);
        zoom=round(zoom);
        console.log('zoom:'+zoom);
        setZoom(zoom);
        console.log('startLocation');
        console.log('latitude:'+startLocation.latitude+' longitude'+startLocation.longitude);
        console.log('endLocation');
        console.log('latitude:'+endLocation.latitude+' longitude'+endLocation.longitude);
      },[endLocation]);

    if(status==2){
      return(
        <ThemeProvider theme={theme}>
        <Container>
      <View style={{
        justifyContent: "center",
        height:'100%',
        alignItems: "center",
        backgroundColor:"aliceBlue"
        }}>
        <Text style={{
           fontSize:30, fontWeight:'bold',
           fontFamily:'sans-serif-light'
           }}>
        
          1km내에 추천할만한 
        
      </Text>
      <Text style={{
           fontSize:30, fontWeight:'bold',
           fontFamily:'sans-serif-light'
           }}>
        
          장소가 없어요 ㅜ_ㅜ
        
      </Text>

      </View>
      </Container>
        </ThemeProvider>
      );
    }
    else if(status==1)
    return(
	    <ScrollView>
      <ThemeProvider theme={theme}>
        <Container>
        <View style={{
            //justifyContent: "center",
            height:'100%',
            alignItems: "center",
            backgroundColor:"aliceBlue"
            }}>

            <View style={{width:350, borderBottomWidth:2, borderBottomColor:'gray', alignItems: "center"}}>
                <View style={{flexDirection:'row', marginRight:30}}>
                    <Image
                        source={category_images[information.category_id]}
                        style={{width:60, height:60, borderRadius:30}}
                    />
                    <Text style={{fontWeight:'bold',fontSize:50}}>{information.name}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20}}>{information.category+' > '}</Text>
                    <Icon name='star' size={25} color={'orange'}/>
                    <Text style={{fontSize:20}}>{information.star}</Text>
                </View>
            </View>

            <View style={{borderBottomWidth:2,borderBottomColor:'gray',height:100, marginTop:10,width:350,}}>
            <View style={{height:30}}>
                <Text style={{fontSize:20}}>주소:{information.address}</Text>
            </View>
            <View style={{height:30}}>
                <Text style={{fontSize:20}}>전화번호:{information.call_number}</Text>
            </View>
            <View style={{flexDirection:'row', height:30, alignItems: "center"}}>
                {/*
                    <Text style={{color: 'blue', fontSize:15}}
                    onPress={() => Linking.openURL(information.url)}>
                {information.url}
                </Text>
                */}
                <TouchableOpacity onPress={() => Linking.openURL(information.url)}>
                <Image source={require('./assets/icons/kakaomap.png')}
                          style={{width:30, height:30}}
                          
                        />
                </TouchableOpacity>
                <Text style={{fontSize:20, marginLeft:5, fontFamily: 'sans-serif-medium',}}>
                    Kakaomap으로 보기
                </Text>
            </View>
            </View>
            <View style={{marginTop:10}}>
            <NaverMapView style={{
                        width: 350, height: 350
                    }}
                         showsMyLocationButton={true}
                         center={{...center, zoom: zoom}}
                         //onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         //onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         //</View>onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                         >
        <Marker coordinate={startLocation} onClick={() => {
            console.warn('latitude'+startLocation.latitude);
            console.warn('longitude'+startLocation.longitude);
            }}/>
        <Marker coordinate={endLocation} pinColor="blue" onClick={() => {
            console.warn('latitude'+endLocation.latitude);
            console.warn('longitude'+endLocation.longitude);
            }}/>
    
    </NaverMapView>
            </View>
        </View>
        </Container>
        </ThemeProvider>
	    </ScrollView>
    );
    else
            return(
              <ThemeProvider theme={theme}>
        <Container>
              <View>
              <View style={{justifyContent: "center",
                  height:'100%',
                  alignItems: "center",
                  backgroundColor:"aliceBlue"}}>
                <Text style={{ fontSize:30, fontWeight:'bold', fontFamily:'sans-serif-light'}}>
                {
                  'Loading중'
                }
              </Text>
              </View>
              </View>
              </Container>
        </ThemeProvider>
            );
};

const Container=styled.SafeAreaView`
  flex:1;
  background-color:aliceblue;
  align-items:center;
  justify-content:flex-start;
`;

const StyleList= StyleSheet.create({
Container: {
  flex:1,
  width: '100%',
  height: '100%',
  //backgroundColor: 'lightsteelblue',
  backgroundColor: 'aliceblue',
  color: 'black',
},
});

export default RecommendScreen;
