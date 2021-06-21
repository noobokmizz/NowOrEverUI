/** Suggest.js

 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useState, createRef, useEffect} from 'react';
 import {Platform} from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
  import styled, {ThemeProvider} from 'styled-components/native';
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
 
 
 const List = styled.ScrollView`
   flex:1;
   width: ${({width})=>width-40}px;
 `;
 
 
 const Container=styled.SafeAreaView`
 flex:1;
 background-color:${({theme})=>theme.background};
 align-items:center;
 justify-content:flex-start;
`;
 
 const Suggest = ({navigation}) => {
   const [mem_idnum,setMem_idnum]=useState('');
   const [cur_x,setCur_x]=useState(null);
   const [cur_y,setCur_y]=useState(null);
   const [location_list,setLocation_list]=useState([]);
   const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);

                setCur_x(latitude);
                setCur_y(longitude);
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
       const location=responseJson.location;
       setLocation_list(location);
       
       let location_array=[];
       let i;
       console.log('length:',location.length);
       for(i=0; i<location.length; i++){
        location_array.push({cs_name:location[i].cs_activity, addr:location[i].lc_addr, name:location[i].lc_name,
            call_number:locationt[i].lc_call_number, lc_id:location[i].lc_id
          });
       }
       seLocation_list(location_array);
     })
     .catch((error) => {
     });
   },[]);
   
   
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
          <List>
                {Object.values(location_list)
                      .map(item=>(
                        <View style={{height:30, flexDirection:'row'}}>
                            <View>
                              <Text>
                                {item.name}
                              </Text>
                              <Text>
                              {item.cs_name}
                              </Text>
                            </View>
                            <View>
                              <View>
                              <Text>
                              {item.addr}
                              </Text>
                              </View>
                              <View>
                              <Text>
                              {item.call_num}
                              </Text>
                              </View>
                              <View>
                              <TouchableOpacity
                                  style={StyleFriendlist.button} 
                              >
                                <Text style={StyleFriendlist.ButtonText}>Choose</Text>
                              </TouchableOpacity>
                              </View>
                            </View> 
                        </View>
                      ))}
             </List>
          
      </View>
      </Container>
    </ThemeProvider>
);
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
      margin:15,
      //padding:10,
      width:80,
      height:25,
    },
    ButtonText:{
      fontSize:15
    }
});
 
 
  export default Suggest;
  