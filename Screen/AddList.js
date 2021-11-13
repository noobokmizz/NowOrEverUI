/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useState, createRef, useEffect} from 'react';
  import RNPickerSelect from 'react-native-picker-select';
  import styled, {ThemeProvider} from 'styled-components/native';
  import {theme} from './src/theme';
  import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
  } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';
 import {localhost} from '../App';
 
 const List = styled.ScrollView`
   flex:1;
   width: ${({width})=>width-40}px;
 `;
 

 //const levenshtein=require('js-levenshtein');
 
 const AddList = ({navigation}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [large_category,setLarge_category] = useState([]);
   const [middle_category, setMiddle_category] = useState([]);
   const [small_category, setSmall_category] = useState([]);
   const [largeitem, setLargeitem]=useState('');
   const [middleitem, setMiddleitem]=useState('');
   const [smallitem, setSmallitem]=useState('');
   const [bk_id,setBk_id]=useState(0);
   const [cs_id,setCs_id]=useState('');
   const [lc_id,setLc_id]=useState('-');
   const [lc_name,setLc_name]=useState('');
   const [add_list,setAdd_list]=useState({});
   const [category_list,setCategory_list]=useState([]);
   const [location_list,setLocation_list]=useState([]);
   const [mem_idnum,setMem_idnum]=useState('');
   const [checktext, setChecktext] = useState('');
   const [recommend_location,setRecommend_location]=useState([]);
   //const [addlist,setAddlist]=useState([]);
   const [category,setCategory]=useState({category_id:0,category:"",lc_id:"-",lc_name:""});
   const [category_info,setCategory_info]=useState([]);
   const [location_info,setLocation_info]=useState([]);

   const _addLocation=()=>{
     alert(`Add:${lc_name}`);
     setLc_name('');
   };
   const _handleTextChange=text=>{
     setLc_name(text);
   }
   useEffect(()=>{
    AsyncStorage.getItem('userInfo',(err,result)=>{
      const userInfo=JSON.parse(result);
      setMem_idnum(userInfo.mem_idnum);
      setBk_id(userInfo.bucketlist.bk_id);
    });
     fetch('http://'+localhost+':8080/categorylist',{
       method:'GET',
       headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
         'Content-Type': 'application/json',
       }
     })
     .then((response) => response.json())
     .then((responseJson)=>{
       setCategory_info(responseJson.category_info);
       setLocation_info(responseJson.location_info);
       //console.log(JSON.stringify(responseJson));
     })
     .catch((error) => {
     });
   },[]);
   
   useEffect(()=>{
    let list=[];
    const set=new Set([]);
    console.log('print all');
    for(var i=0; i<category_info.length; i++){

      set.add(category_info[i].cl_activity);
      // console.log('set i:'+i);
      // console.log('value:'+category_info[i].cl_activity);
      // console.log('id:'+category_info[i].category_id);
     
    }
    i=0;
    console.log('print distinct');
    for (let item of set){
      if(item!=null)
       list.push({value:item, label:item});
       console.log('i:'+i);
       console.log('value:'+item);
       i=i+1;
      }
    console.log('list.length:'+list.length);
    setLarge_category(list);
   },[category_info]);

   useEffect(()=>{
     console.log('largeItem:'+largeitem);
    let list=[];
    let set=new Set();
    for(var i=0; i<category_info.length; i++){
      if(category_info[i].cl_activity==largeitem)
      set.add(category_info[i].cm_activity);
    }
    i=0;
    
    for (let item of set){
      if(item!=null)
       list.push({value:item, label:item});
      console.log('i:'+i);
      console.log('value:'+item);
      //console.log('length:'+item.length)
       i=i+1;
      }
    setMiddle_category(list);
   },[largeitem]);


   useEffect(()=>{
    console.log('middleItem:'+middleitem);
   let list=[];
   const set=new Set([]);
   for(var i=0; i<category_info.length; i++){
     if(category_info[i].cm_activity==middleitem)
     set.add(category_info[i].cs_activity);
   }
   i=0;
   for (let item of set){
     if(item!=null)
      list.push({value:item, label:item});
     console.log('i:'+i);
     console.log('value:'+item);
      i=i+1;
     }
     for(var i=0; i<category_info.length; i++){
      if(category_info[i].cm_activity==middleitem){
        category.category_id=category_info[i].category_id;
        category.category=category_info[i].category;
        category.lc_id="-";
        category.lc_name=null;
        setAdd_list(category);
       break;
       }
    }
   setSmall_category(list);
  },[middleitem]);

  useEffect(()=>{
    console.log('smallItem:'+smallitem);
   const set=new Set([]);
   let category=new Object();
   for(var i=0; i<category_info.length; i++){
     if(category_info[i].cs_activity==smallitem){
       category.category_id=category_info[i].category_id;
       category.category=category_info[i].category;
       //category.category="도보여행";
       category.lc_id="-";
       category.lc_name=null;
       setAdd_list(category);
      break;
      }
   }
  },[smallitem]);

  const handleSubmitPress = () => {
    fetch('http://'+localhost+':8080/bucketlist/add',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mem_idnum : mem_idnum,
        bk_id:bk_id,
        bucketlistContents:add_list,
        }),
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        console.log(JSON.stringify({
          mem_idnum : mem_idnum,
          bk_id:bk_id,
          bucketlistContents:add_list,
          }));
        console.log('add response:'+JSON.stringify(responseJson));
        if(responseJson.status==1){
          Alert.alert(
            add_list.category,
            "success",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed") 
              }
            ]
            );
        }
        else{
          Alert.alert(
            "이미 있는 카테고리입니다.",
            "fail",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed") 
              }
            ]
            );
        }
        })
        .catch((error) => {
          console.error(error);
        })
    
  };

     return (
       <View style={StyleFriendlist.Container}>
         
         <View style={{
           width: 300, 
           margin:10,
           backgroundColor:'white',
           height:50, 
           flexDirection:'row', 
           borderColor:'#a1a1a1', 
           borderWidth:2,
         }}>
           <RNPickerSelect
               style = {{
                 margin:30,
                 inputAndroid : {color : 'black'},
                 //borderColor:'black',
                 //borderRadius: 4,
                 //borderWidth:5,
                 borderColor: '#a1a1a1',
                 borderTopWidth: 1.5,
                 borderRightWidth: 1.5,
               }}
               placeholderTextColor="blue"
               placeholder={{
                label: '대분류를 고르시오',
                color: 'black',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setLargeitem(value)}
               items={large_category}
           />
           
         </View>

         <View style={{ 
           width: 300, 
           margin:10,
           backgroundColor:'white',
           height:50, 
           flexDirection:'row', 
           borderColor:'#a1a1a1', 
           borderWidth:2,
        }}>
           
           <RNPickerSelect
               style = {{
                 margin:30,
                 inputAndroid : {color : 'black'},
                 borderColor:'black',
                 borderRadius: 4,
                 borderWidth:1,
               }}
               //placeholderTextColor="black"
               placeholder={{
                label: '중분류를 고르시오',
                color: 'black',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setMiddleitem(value)}
               items={middle_category}
           />
           
         </View>

         <View style={{
            width: 300, 
            margin:10,
            backgroundColor:'white',
            height:50, 
            flexDirection:'row', 
            borderColor:'#a1a1a1', 
            borderWidth:2,
        }}>
           
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
                   label: '소분류를 고르시오',
                   color: 'black',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setSmallitem(value)}
               items={small_category}
           />
           
         </View>
           
         <View style={{
            width: 300, 
            margin:10,
            backgroundColor:'white',
            height:50, 
            flexDirection:'row', 
            borderColor:'#a1a1a1', 
            borderWidth:2,
         }}>{ 
           <TextInput 
             style={{
               //marginLeft:20,
               fontSize:15
             }}
             placeholderTextColor="gray"
            placeholder="장소를 입력하시오"
             onChangeText={(value) => setLc_name(value)}
             value={lc_name}
           />
         }</View>

         <View style={{alignItems:'center'}}>
           <TouchableOpacity
               style={StyleFriendlist.button}
               onPress={()=>handleSubmitPress()} // Details로 화면 이동    
           >
             <Text style={StyleFriendlist.ButtonText}>추가</Text>
           </TouchableOpacity>
       
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
    pickerStyle:{
      width: 300, 
      margin:10,
      backgroundColor:'white',
      height:50, 
      flexDirection:'row', 
      borderColor:'#a1a1a1', 
      borderWidth:2
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
       //width: '100%',
       height: '100%',
       backgroundColor: 'aliceblue',
       alignItems:'center',
       justifyContent: 'center',
       //paddingTop: 40,
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
     button:{
       alignItems:"center",
       justifyContent:'center',
       backgroundColor:"lightskyblue",
       //color:'purple',
       margin:15,
       width:150,
       height:25,
     },
     ButtonText:{
       fontSize:15
     },
     Picker:{
         //inputAndroid : {color : 'black'},
         borderColor:'black',
         borderRadius: 4,
         borderWidth:1,
     }
 });
 
  export default AddList;
  