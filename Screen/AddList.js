/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, createRef} from 'react';
// import React, {Fragment, Component} from 'react';
 import RNPickerSelect from 'react-native-picker-select';
 //import {Picker} from 'react-native';
 //import SelectBox from 'react-native-multi-selectbox'

 import {
   StyleSheet,
   View,
   Image,
   Text,
 } from 'react-native';

 const AddList = () => {
    const [userName, setUserName] = useState('');
    const nameInputRef = createRef();
    var dataToSend = {
      user_name: userName,
    };
    fetch('http://172.27.48.1:8080/api/user/register',{
      "method":"GET",
      "headers":{
      }
    })
      .then((response)=>response.json())
      .then((response)=>{
        setUserName(response.asdfasfdsafdsdf);
        })
      .catch((error)=>{
        console.error(error);
      });

    return (
      <View style={StyleFriendlist.Container}>
      <View style={StyleFriendlist.profileHeader}>
                    <View style={StyleFriendlist.profileHeaderPicCircle}>
                    <Text style={{fontSize: 25, color: 'aquamarine'}}>
                        {'About Readddddddct'.charAt(0)}   
                    </Text>
                    </View>
                    <Text style={StyleFriendlist.profileHeaderText}>Name</Text>
                </View>
      <View style={{backgroundColor:'white', width: 300, margin:50}}>
        <RNPickerSelect
            style = {{
              margin:30,
              inputAndroid : {color : 'black'},
              borderColor:'black',
              borderRadius: 4,
              borderWidth:1,
            }}
            placeholderTextColor="black"
            placeholder={{
                label: 'Select a Large Category',
                value: null,
            }}
          
            //useNativeAndroidPickerStyle={false}
            //fixAndroidTouchableBug={true}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
                //{label:}
            ]}
            
        />
      </View>
      </View>
  );
 };
 
 const styles = StyleSheet.create({  //이 부분 형식은 고정
   /* 원하는 스타일 포맷을 만듦 */
   container:{     //Format 1
     marginTop:10,   //위에서 거리
     marginLeft:20, 
     //backgroundColor: "blue",
     color:'black'
     //flexDirection: 'row'
   },
   title:{         //Format 2
    
     fontWeight: 'bold',     //글씨체
     color: 'gray',          //글씨 색깔
     fontSize: 15,           //글씨 크기
   },
   detail:{        //Format 3
     marginLeft:10,
   }
 });

 const StyleFriendlist= StyleSheet.create({
  Container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'lightsteelblue',
      paddingTop: 40,
      color: 'black',
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
    profileHeaderLine: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: '#e2e2e2',
      marginTop: 15,
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
});

 export default AddList;
 