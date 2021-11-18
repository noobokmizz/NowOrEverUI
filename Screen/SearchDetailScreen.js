import React, {useState,useEffect} from 'react';
import HTML from "react-native-render-html";
import Geolocation from '@react-native-community/geolocation';
import {theme} from './src/theme';
import { 
    Text, 
    StatusBar,
    ScrollView, 
    useWindowDimensions,
    StyleSheet,
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
import {
    sqrt,abs,round
  } from 'mathjs'
  import styled, {ThemeProvider} from 'styled-components/native';
//import Geolocation from 'react-native-geolocation-service';

const SearchDetailScreen = ({route}) => {
    const [bk_key,setBk_key]=useState({mem_idnum:1,bk_id:1});
    const [information,setInformation]=useState({name:'',address:'',call_number:'',url:'',star:0,recommendList:[]})
    const [startLocation,setStartLocation]=useState({latitude: 37.564362, longitude: 126.977011})
    const [endLocation,setEndLocation]=useState({latitude: 37.564362, longitude: 126.977011})
    const [center,setCenter]=useState({latitude: 37.564362, longitude: 126.977011})
    const [zoom,setZoom]=useState(5)
    const [recommendList, setRecommendList] = useState([]);
    let categoryId=route.params.category_id.toString();

    useEffect(()=>{
        AsyncStorage.getItem('userInfo',(err,result)=>{
          const userInfo=JSON.parse(result);
          setBk_key({mem_idnum:userInfo.mem_idnum,bk_id:userInfo.bucketlist.bk_id});
        });
        console.log('route.params.lc_id:'+route.params.lc_id);
        //console.log('category:'+route.params.category)
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
                star:responseJson[0].rv_starrate,
                category:responseJson[0].category
            })
            setEndLocation({latitude:parseFloat(responseJson[0].location.lc_y),longitude:parseFloat(responseJson[0].location.lc_x)})
            setRecommendList(responseJson[0].recommendList)
        })
        .catch((error) => {
          console.error(error);
        })
      },[bk_key]);

      useEffect(()=>{
          setCenter({latitude:(startLocation.latitude+endLocation.latitude)/2,longitude:(startLocation.longitude+endLocation.longitude)/2});
          let latitude=abs(startLocation.latitude-endLocation.latitude)*1000;
          let longitude=abs(startLocation.longitude+endLocation.longitude)*1000;
          let zoom=sqrt(latitude*latitude+longitude*longitude)/34000;
          zoom=round(zoom);
          setZoom(zoom);
        console.log('zoom:'+zoom);
      },[startLocation,endLocation]);

      useEffect(()=>{
        console.log('recommendList.length:'+recommendList.length);
      },[recommendList]);

if(recommendList.length==0){
    return(
	<ScrollView>
        <ThemeProvider theme={theme}>
        <Container>
        <View style={{
            //justifyContent: "center",
            height:'100%',
            alignItems: "center"}}>

            <View style={{width:350, borderBottomWidth:2, borderBottomColor:'gray', alignItems: "center"}}>
                <View style={{flexDirection:'row', marginRight:30}}>
                    <Image
                        source={category_images[categoryId]}
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
}
else{
    return(
	<ScrollView>
        <ThemeProvider theme={theme}>
        <Container>
        <View style={{
            //justifyContent: "center",
            height:'100%',
            alignItems: "center"}}>

            <View style={{width:350, borderBottomWidth:2, borderBottomColor:'gray', alignItems: "center"}}>
                <View style={{flexDirection:'row', marginRight:30}}>
                    <Image
                        source={category_images[categoryId]}
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
	     <View style={{height:30, marginTop:30,width:350,}}>
	    <View style={{height:50}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>{"이런 장소는 어때요?"}</Text>
            </View>
	    </View>
                <View style={{flexDirection:'row', marginRight:30,}}>
                    <Image
                        source={category_images[recommendList[0].locationId.lc_category]}
                        style={{width:30, height:30, borderRadius:30}}
                    />
                    <Text style={{fontSize:15}}>{recommendList[0].lc_name}</Text>
                    <Image
                        source={category_images[recommendList[1].locationId.lc_category]}
                        style={{marginLeft:15, width:30, height:30, borderRadius:30}}
                    />
                    <Text style={{fontSize:15}}>{recommendList[1].lc_name}</Text>
                    <Image
                        source={category_images[recommendList[2].locationId.lc_category]}
                        style={{marginLeft:15, width:30, height:30, borderRadius:30}}
                    />
                    <Text style={{fontSize:15}}>{recommendList[2].lc_name}</Text>
	    </View>
	    </View>
	    </Container>
        </ThemeProvider>
	</ScrollView>
    );
}
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

export default SearchDetailScreen;
