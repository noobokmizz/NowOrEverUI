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
 import Input from './src/components/Input';
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
   let list=[];
   const set=new Set([]);
   let category=new Object();
   for(var i=0; i<category_info.length; i++){
     if(category_info[i].cs_activity==smallitem){
       category.category_id=category_info[i].category_id;
       category.category=category_info[i].category;
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
        bucketlistContentsList:add_list,
        }),
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        console.log(JSON.stringify({
          mem_idnum : mem_idnum,
          bk_id:bk_id,
          bucketlistContentsList:add_list,
          }));
        console.log('add response:'+JSON.stringify(responseJson));
        })
        .catch((error) => {
          console.error(error);
        })
    
  };
  
  
  //  const change_middle=(value)=>{
  //    setLarge(value);
  //    let middle_array=[];
  //    let i;
  //    console.log('large value:',value);
  //    for(i=0; i<category_list.length; i++){
  //      console.log("i:",i);
  //      if(category_list[i].cl_activity==value){
  //        middle_array.push(category_list[i].cm_activity);
  //        console.log('add ',i);
  //      }
  //    }
  //    const middleitem_tmp=middle_array.map(obr=>({
  //      label:obr,
  //      value:obr,
  //    }));
  //    const newset=[...new Set(middleitem_tmp.map(JSON.stringify))].map(JSON.parse);
  //    setMiddleitem(newset);
  //    console.log('middle newset:',newset);
  //  }
  //  const change_small=(value)=>{
  //    setMiddle(value);
  //    let small_array=[];
  //    let i;
  //    console.log('middle value:',value);
  //    for(i=0; i<category_list.length; i++){
  //      console.log("i:",i);
  //      if(category_list[i].cm_activity==value){
  //        small_array.push(category_list[i].cs_activity);
  //        console.log('add ',i);
  //      }
  //    }
  //    const smallitem_tmp=small_array.map(obr=>({
  //      label:obr,
  //      value:obr,
  //    }));
  //    const newset=[...new Set(smallitem_tmp.map(JSON.stringify))].map(JSON.parse);
  //    setSmallitem(newset);
  //    console.log('small newset:',newset);
  //  }
  //  const handleSubmitPress = () => {
  //    //let dataToSend = {name: name, large: large, middle:middle, small:small};
  //    //let formBody = [];
  //    //if(value!=''){ setLc_id(value.lc_id);}
  //    let i;
  //    console.log('small:',small);
  //    for(i=0; i<category_list.length; i++){
  //      console.log('cs_activity',category_list[i].cs_activity,'small:',small);
  //      if(category_list[i].cs_activity==small){
  //        console.log('i:',i,'cs_id:',cs_id, 'small:',small, 'category_list[i].cs_id:',category_list[i].cs_id);
  //        setCs_id(category_list[i].cs_id);
  //        console.log('after cs_id:',cs_id,'category_list[i].cs_id:',category_list[i].cs_id );
  //        break;
  //      }
  //    }
  //    if(lc_name!=''){
  //      let location_array=[];
  //      for(i=0; i<location_list.length; i++){
  //        if(levenshtein(location_list[i].lc_name,lc_name)>=3){
  //          location_array.push({cs_name:location_list[i].cs_activity, addr:location_list[i].lc_addr, name:location_list[i].lc_name,
  //            call_number:location_list[i].lc_call_number, lc_id:location_list[i].lc_id
  //          });
  //        }
  //      }
  //      setRecommend_location(location_array);
  //      setModalVisible(true);
  //    }
  //    console.log('SendToData cs_id:',cs_id,' lc_id:',lc_id);
     
  //  fetch('http://3.35.217.247:8080/api/bucketlist/add', { //link 수정
  //  method: 'POST',
  //  headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
  //    'Content-Type': 'application/json',
  //  },
  //    body: JSON.stringify({
  //      mem_idnum : mem_idnum,
  //      cs_id:cs_id,
  //      lc_id:lc_id,
  //      }),
  //  })
  //      .then((response) => response.json())
  //      .then((responseJson) => {
  //        //Hide Loader
  //        console.log(responseJson);
  //        // If server response message same as Data Matched
  //        if (responseJson.status == 1) {
  //          setChecktext('Add success');
  //        } else if(responseJson.status!=-1){
  //          setChecktext('error');
  //          console.log('error');
  //        }
  //        else {
  //          setChecktext('');
  //        }
 
  //      })
  //      .catch((error) => {
  //        //Hide Loader
  //        //setLoading(false);
  //        console.error(error);
  //      });
  //  };


     return (
       <View style={StyleFriendlist.Container}>
         
         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30,
           height:50, flexDirection:'row'
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
                   label: 'Select a Large Category',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setLargeitem(value)}
               items={large_category}
           />
           
         </View>

         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30,
           height:50, flexDirection:'row'
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
                   label: 'Select a Middle Category',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setMiddleitem(value)}
               items={middle_category}
           />
           
         </View>

         <View style={{
           backgroundColor:'white',
            width: 300, margin:10, marginLeft:30,
           height:50, flexDirection:'row'
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
                   label: 'Select a Small Category',
                   value: null,
               }}
             
               useNativeAndroidPickerStyle={false}
               fixAndroidTouchableBug={true}
               onValueChange={(value) => setSmallitem(value)}
               items={small_category}
           />
           
         </View>
        
           
         <ThemeProvider theme={theme}>
         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30}}>{ 
           <TextInput 
             style={{
               marginLeft:20,
               fontSize:20
             }}
             onChangeText={(value) => setLc_name(value)}
             value={lc_name}
           />
         }</View>
         </ThemeProvider>

         <View style={{alignItems:'center'}}>
           <TouchableOpacity
               style={StyleFriendlist.button}
               onPress={()=>handleSubmitPress()} // Details로 화면 이동    
           >
             <Text style={StyleFriendlist.ButtonText}>Add to BucketList</Text>
           </TouchableOpacity>
           <Text style={{color:'red',  textAlign: 'center', fontSize: 14,}}> {checktext} </Text>
       
         </View>
        {/* <View>
          <Modal
           visible={modalVisible}
           onRequestClose={() => {
             Alert.alert("Modal has been closed.");
             setModalVisible(!modalVisible);
           }}
          >
            <View>
              <List>
                 {Object.values(recommend_location)
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
                                   onPress={() => setModalVisible(false)} // 안보이게   
                               >
                                 <Text style={StyleFriendlist.ButtonText}>Choose</Text>
                               </TouchableOpacity>
                               </View>
                             </View> 
                         </View>
                       ))}
              </List>
            </View>
          </Modal>
        </View> */}
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
       //width: '100%',
       height: '100%',
       backgroundColor: 'lightsteelblue',
      // alignItems:'center',
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
       backgroundColor:"purple",
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
  