/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useState, createRef, useEffect} from 'react';
 // import React, {Fragment, Component} from 'react';
  import RNPickerSelect from 'react-native-picker-select';
  //import {Picker} from 'react-native';
  //import SelectBox from 'react-native-multi-selectbox'
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
 
 
 const List = styled.ScrollView`
   flex:1;
   width: ${({width})=>width-40}px;
 `;
 
 
 const ITEM=[
   {
     label:'football',
     value:'football',
   },
   {
     label:'basketball',
     value:'basketball',
   },
   {
     label:'baseball',
     value:'baseball',
   },
   {
     label:'label',
     value:'value',
   }
 ]
 //const levenshtein=require('js-levenshtein');
 
 const AddList = ({navigation}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [large,setLarge] = useState('');
   const [middle, setMiddle] = useState('');
   const [small, setSmall] = useState('');
   const [largeitem, setLargeitem]=useState([{label:'',value:''},]);
   const [middleitem, setMiddleitem]=useState([{label:'',value:''},]);
   const [smallitem, setSmallitem]=useState([{label:'',value:''},]);
   const [cs_id,setCs_id]=useState('');
   const [lc_id,setLc_id]=useState('');
   const [lc_name,setLc_name]=useState('');
   const [category_list,setCategory_list]=useState([]);
   const [location_list,setLocation_list]=useState([]);
   const [mem_idnum,setMem_idnum]=useState('');
   const [checktext, setChecktext] = useState('');
   const [recommend_location,setRecommend_location]=useState([]);
   //var category_list;
   let large_set=new Set();
   let middle_set=new Set();
   let small_set=new Set(); 
   //const passwordInputRef = createRef();
   /*const Recommend_modal=({item})=>{
     return(
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
               //onPress={handleSubmitPress(item.lc_id)} // Details로 화면 이동    
           >
             <Text style={StyleFriendlist.ButtonText}>Choose</Text>
           </TouchableOpacity>
           </View>
         </View> 
     </View>
     );
   };*/
   const _addLocation=()=>{
     alert(`Add:${lc_name}`);
     setLc_name('');
   };
   const _handleTextChange=text=>{
     setLc_name(text);
   }
   useEffect(()=>{
     AsyncStorage.getItem('mem_idnum',(err,result)=>{
       setMem_idnum(result);
     });
     //let dataToSend = {mem_idnum:mem_idnum};
     //let formBody = [];
     fetch('http://3.35.217.247:8080/api/bucketlist/showcategory',{
       method:'POST',
       headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         mem_idnum : mem_idnum
         }),
     })
     .then((response) => response.json())
     .then((responseJson)=>{
       //setObj(JSON.parse(JSON.stringify(responseJson)));
       const category=responseJson.category_list;
       setCategory_list(category);
       const location=responseJson.location_list;
       setLocation_list(location);
       //setObj(JSON.parse(responseJson));
       //console.log(obj.category_list);
       
       let large_array=[];
       let i;
       console.log('length:',category_list.length);
       for(i=0; i<category_list.length; i++){
         //console.log('before i:',i);
         large_array.push(category_list[i].cl_activity);
         //console.log('i:',i);
       }
       let largeitem_tmp=large_array.map(obr=>({
         label:obr,
         value:obr,
       }));
       //console.log(largeitem_tmp);   //잘 됨
 
       /*let uniqueArr=largeitem_tmp.reduce((a,b)=>{
         if(a.indexOf(b)<0)a.push(b);
         return a;
       });*/
       const newset=[...new Set(largeitem_tmp.map(JSON.stringify))].map(JSON.parse);
       console.log("newset:",newset);
       //console.log("unique:",uniqueArr);
       setLargeitem(newset);
       console.log("largeitem:",largeitem);
 
       //var uniqueArr =[...new Set(largeitem_tmp)];
      
       //console.log("unique:",uniqueArr);
       //setLargeitem(_uniqBy(largeitem_tmp));
       
       
      
       //console.log(ITEM);
       //large_array=Array.from(large_set);
     })
     .catch((error) => {
       //console.error(error);
     });
   },[large,small,middle,cs_id]);
   
   const change_middle=(value)=>{
     setLarge(value);
     let middle_array=[];
     let i;
     console.log('large value:',value);
     for(i=0; i<category_list.length; i++){
       console.log("i:",i);
       if(category_list[i].cl_activity==value){
         middle_array.push(category_list[i].cm_activity);
         console.log('add ',i);
       }
     }
     const middleitem_tmp=middle_array.map(obr=>({
       label:obr,
       value:obr,
     }));
     const newset=[...new Set(middleitem_tmp.map(JSON.stringify))].map(JSON.parse);
     setMiddleitem(newset);
     console.log('middle newset:',newset);
   }
   const change_small=(value)=>{
     setMiddle(value);
     let small_array=[];
     let i;
     console.log('middle value:',value);
     for(i=0; i<category_list.length; i++){
       console.log("i:",i);
       if(category_list[i].cm_activity==value){
         small_array.push(category_list[i].cs_activity);
         console.log('add ',i);
       }
     }
     const smallitem_tmp=small_array.map(obr=>({
       label:obr,
       value:obr,
     }));
     const newset=[...new Set(smallitem_tmp.map(JSON.stringify))].map(JSON.parse);
     setSmallitem(newset);
     console.log('small newset:',newset);
   }
   const handleSubmitPress = () => {
     //let dataToSend = {name: name, large: large, middle:middle, small:small};
     //let formBody = [];
     //if(value!=''){ setLc_id(value.lc_id);}
     let i;
     console.log('small:',small);
     for(i=0; i<category_list.length; i++){
       console.log('cs_activity',category_list[i].cs_activity,'small:',small);
       if(category_list[i].cs_activity==small){
         console.log('i:',i,'cs_id:',cs_id, 'small:',small, 'category_list[i].cs_id:',category_list[i].cs_id);
         setCs_id(category_list[i].cs_id);
         console.log('after cs_id:',cs_id,'category_list[i].cs_id:',category_list[i].cs_id );
         break;
       }
     }
     if(lc_name!=''){
       let location_array=[];
       for(i=0; i<location_list.length; i++){
         if(levenshtein(location_list[i].lc_name,lc_name)>=3){
           location_array.push({cs_name:location_list[i].cs_activity, addr:location_list[i].lc_addr, name:location_list[i].lc_name,
             call_number:location_list[i].lc_call_number, lc_id:location_list[i].lc_id
           });
         }
       }
       setRecommend_location(location_array);
       setModalVisible(true);
     }
     console.log('SendToData cs_id:',cs_id,' lc_id:',lc_id);
     
   fetch('http://3.35.217.247:8080/api/bucketlist/add', { //link 수정
   method: 'POST',
   headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
     'Content-Type': 'application/json',
   },
     body: JSON.stringify({
       mem_idnum : mem_idnum,
       cs_id:cs_id,
       lc_id:lc_id,
       }),
   })
       .then((response) => response.json())
       .then((responseJson) => {
         //Hide Loader
         console.log(responseJson);
         // If server response message same as Data Matched
         if (responseJson.status == 1) {
           setChecktext('Add success');
         } else if(responseJson.status!=-1){
           setChecktext('error');
           console.log('error');
         }
         else {
           setChecktext('');
         }
 
       })
       .catch((error) => {
         //Hide Loader
         //setLoading(false);
         console.error(error);
       });
   };
     return (
       <View style={StyleFriendlist.Container}>
         
         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30}}>
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
               onValueChange={(value) => change_middle(value)}
               //items={ITEM}
               items={largeitem}
               
               /*items={category_list.map((obj=>({
                 label:obj.cl_activity,
                 value:obj.cl_activity
               })))}*/
               
           />
           
         </View>
         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30}}>
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
             
               //useNativeAndroidPickerStyle={false}
               //fixAndroidTouchableBug={true}
               onValueChange={(value) => change_small(value)}
               items={middleitem}
               /*items={[
                   { label: 'Football', value: 'football' },
                   { label: 'Baseball', value: 'baseball' },
                   { label: 'Hockey', value: 'hockey' },
                   //{label:}
               ]}*/
               
           />
           
         </View>
         <View style={{backgroundColor:'white', width: 300, margin:10, marginLeft:30}}>
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
             
               //useNativeAndroidPickerStyle={false}
               //fixAndroidTouchableBug={true}
               onValueChange={(value) => setSmall(value)}
               items={smallitem}
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
        <View>
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
      // alignItems:'center',
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
  