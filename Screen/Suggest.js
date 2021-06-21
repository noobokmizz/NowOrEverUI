/** Suggest.js

 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useState, createRef, useEffect} from 'react';
 import Geolocation from '@react-native-community/geolocation';
  import styled, {ThemeProvider} from 'styled-components/native';
  import {Dimensions} from 'react-native';
  import {theme} from './src/theme';
  import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
  } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';
import { renderNode } from 'react-native-elements/dist/helpers';
 
 
 const List = styled.ScrollView`
   flex:1;
   background-color:#b0c4de;
 `;
 
 
 const Container=styled.SafeAreaView`
 flex:1;
 width:100%;
 background-color:#b0c4de;
 justify-content:flex-start;
`;
 
 const Suggest = ({navigation}) => {
   const [mem_idnum,setMem_idnum]=useState('');
   const [cur_x,setCur_x]=useState('');
   const [cur_y,setCur_y]=useState('');
   const [location_list,setLocation_list]=useState([]);
   const [count,setCount]=useState(0);
   //let mem_idnum;
   //let cur_x;
   //let cur_y;
   //let location_list=[];
   //const [location_list,setLocation_list]=useState([{name:'1', cs_name:'1',call_num:'1',addr:'1'}]);
   const width=Dimensions.get('window').width;
   let location_array=[];
   const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);
                //cur_y=latitude;
                //cur_x=longitude;
                setCur_y(latitude);
                setCur_x(longitude);
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    }
    
   useEffect(()=>{
     AsyncStorage.getItem('mem_idnum',(err,result)=>{
       setMem_idnum(result);
     });
     geoLocation();
     fetch('http://3.35.217.247:8080/api/bucketlist/reclist',{
       method:'POST',
       headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         mem_idnum : mem_idnum,
         cur_x:cur_x,
         cur_y:cur_y
         }),
     })
     .then((response) => response.json())
     .then((responseJson)=>{
       if(count<=1){
         setCount(count+1);
        const location=responseJson.location;
        //setLocation_list(location);
        console.log('id:',mem_idnum,'cur_x:',cur_x);
        let i;
        console.log('length:',location.length);
        for(i=0; i<location.length; i++){
          console.log('before i:',i);
          location_array.push({cs_name:location[i].cs_activity, addr:location[i].lc_addr, name:location[i].lc_name,
              call_num:location[i].lc_call_number, key:location[i].lc_id
            });
            console.log('after i:',i);
        }
        console.log(location_array);
        setLocation_list(location_array);
        console.log('list:',location_list);
      }
     })
     .catch((error) => {
     });
   },[mem_idnum,cur_x,cur_y,location_list]);
   
   if(location_list.length!=0)
   {
   return(
         <ThemeProvider theme={theme}>
                <Container>
                <View style={styles.Container}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileHeaderPicCircle}>
                        <Text style={{fontSize: 25, color: 'aquamarine'}}>
                            {'About React'.charAt(0)}   
                        </Text>
                        </View>
                        <Text style={StyleList.profileHeaderText}>admin</Text>
                    </View>
                    
                    <View style={{height:400}}>
                    <List>
                          {
                          //Object.values(location_list)
                              location_list  
                              .map((item,index)=>(
                                  <View key={item.key} style={{height:40, flexDirection:'row'}}>
                                      <View style={{width:150}}>
                                        <Text>
                                            {item.name}
                                        </Text>
                                        <Text style={{fontSize:10}}>
                                          {item.cs_name}
                                        </Text>
                                      </View>
                                      <View style={{marginLeft:2}}>
                                        
                                          <Text style={{fontSize:10, marginTop:5}}>
                                            {item.addr}
                                          </Text>
                                        
                                          
                                  
                                      </View> 
                                      <View>
                                        <TouchableOpacity
                                            style={StyleList.button} 
                                            onPress={()=>{
                                              AsyncStorage.setItem('dest_id', item.key);
                                              navigation.navigate('PrintPath')
                                            }}
                                        >
                                          <Text style={StyleList.ButtonText}>Choose</Text>
                                        </TouchableOpacity>
                                        </View>
                                  </View>
                                ))
                              }
                      </List>
                    </View>
                </View>
                </Container>
                </ThemeProvider>
);}
else
return(
  <ThemeProvider theme={theme}>
                <Container>
                <View style={styles.Container}>
                    <View style={styles.profileHeader}>
                        <View style={styles.profileHeaderPicCircle}>
                        <Text style={{fontSize: 25, color: 'aquamarine'}}>
                            {'About React'.charAt(0)}   
                        </Text>
                        </View>
                        <Text style={StyleList.profileHeaderText}>admin</Text>
                    </View>
                    <View>
                      <Text style={{fontSize:20, fontWeight:'bold'}}>
                        No recommend activity..
                      </Text>
                    </View>
                </View>
                </Container>
                </ThemeProvider>
)
                };
  const styles = StyleSheet.create({  //이 부분 형식은 고정
    /* 원하는 스타일 포맷을 만듦 */
    Container:{     //Format 1
      marginTop:10,   //위에서 거리
      marginLeft:20, 
      //backgroundColor: "blue",
      color:'black'
      //flexDirection: 'row'
    },
    profileHeader: {      //프로필 있는 부분 박스 
        flexDirection: 'row',
        backgroundColor: 'lightsteelblue',
        padding: 15,
        textAlign: 'center',
      },
      profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileHeaderText: {
        color: 'black',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
      },
});
const StyleList= StyleSheet.create({
  Container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'lightsteelblue',
      color: 'black',
    },
    profileHeader: {      //프로필 있는 부분 박스 
      flexDirection: 'row',
      backgroundColor: 'skyblue',
      padding: 20,
      textAlign: 'center',
      height:100,
      borderBottomColor:'black',
      borderBottomWidth:1
    },
    profileHeaderPicCircle: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHeaderText: {
      color: 'black',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold',
    },
   
    inputStyle: {
      flex: 1,
      color: 'black',
      margin:10,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 10,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    TitleStyle:{
      fontSize:20,
      fontWeight: 'bold',
    },
    button:{
      alignItems:"center",
      justifyContent:'center',
      backgroundColor:"#DDDDDD",
      marginLeft:10,
      //padding:10,
      width:80,
      height:25,
    },
    ButtonText:{
      fontSize:15
    }
});
 
 
  export default Suggest;
  