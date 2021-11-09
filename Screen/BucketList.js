import React, {useState, createRef,useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';
import {Input,ContextInput} from './src/components/Input';
//import ContextInput from './src/components/Input';
import {
  Button,
   View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
  } from 'react-native';
import {StatusBar,Dimensions} from 'react-native';
import Task from './Components/Task';
import AsyncStorage from '@react-native-community/async-storage';

import {localhost} from '../App';


const List = styled.ScrollView`
  flex:1;
  width: ${({width})=>width-40}px;
`;


export const BucketList=({navigation})=>{
    const width=Dimensions.get('window').width;
    const [bk_key,setBk_key]=useState({});
    const [nickname,setNickname]=useState('');
    //const [mem_idnum,setMem_idnum]=useState(0);
    //const [bk_id,setBk_id]=useState(0);
    const [bucketlistContentsList,setBucketlistContentsList]=useState([]);
    const [category_list,setCategory_list]=useState([]);
    const [location_list,setLocation_list]=useState([]);
    const [delete_list,setDelete_list]=useState([]);
    //const [tasks,setTasks]=useState([{text:'',id:''}]);
    const [loading, setLoading] = useState(false);
  
    const _deleteAlert = (id) =>{
      Alert.alert(
          "정말로",
          "삭제하시겠습니까?",
          [
            {
              text: "Yes",
              onPress: () => {deleteTask(id);} 
            },
            {
              text: "No",
            }
          ]
          );
    }

    const _LookDetails = (id) =>{
      let lc_id;
      let category;
      for(var i=0; i<bucketlistContentsList.length; i++){
        if(i==((-id)-1)){
          console.log("delete location:"+bucketlistContentsList[i].lc_name);
         lc_id=bucketlistContentsList[i].lc_id;
         category=bucketlistContentsList[i].category;
         break;
        }
      }
      navigation.navigate('SearchDetailScreen',{lc_id,category});
      let mem_idnum=bk_key.mem_idnum;
      let bk_id=bk_key.bk_id;
      
      /*fetch('http://'+localhost+':8080/bucketlist/path?mem_idnum='+mem_idnum+
      '&bk_id='+bk_id+'&lc_id'+lc_id,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        
      navigation.navigate('SearchDetailScreen',{json:responseJson});
        
      })
        .catch((error) => {
          console.error(error);
        })*/
    }

    const deleteTask = id => {
      console.log("id:"+id);
     let deleteList=[];
     var task=new Object();
     let list;
     let taskId=0;
     let deletename;
     if(id>=0){
       for(var i=0; i<bucketlistContentsList.length; i++){
         if(i==(id-1)){
           console.log("delete category:"+bucketlistContentsList[i].category);
          taskId=bucketlistContentsList[i].category_id;
          console.log("taskId:"+taskId);
          break;
         }
       }
     }
     else{
      for(var i=0; i<bucketlistContentsList.length; i++){
        if(i==((-id)-1)){
          console.log("delete location:"+bucketlistContentsList[i].lc_name);
         taskId=bucketlistContentsList[i].lc_id;
         console.log("taskId:"+taskId);
         break;
        }
      }
     }
     if(id>0){
     for(var i=0; i<category_list.length; i++){
      if(category_list[i].category_id==taskId){
        task.category_id=category_list[i].category_id;
        task.category=category_list[i].category;
        task.lc_id=category_list[i].lc_id;
        task.lc_name=category_list[i].lc_name;

        console.log("delete category i"+i);
        deleteList.push(task);
        deletename=task.category;
        setCategory_list(category_list.filter(category=>category.category_id!==taskId));
        //list=category_list;
        //list.splice(i,1);
        break;
      }
     }
    }
     else{
      for(var i=0; i<location_list.length; i++){
        if(location_list[i].lc_id==taskId){
          task.category_id=location_list[i].category_id;
          task.category=location_list[i].category;
          task.lc_id=location_list[i].lc_id;
          task.lc_name=location_list[i].lc_name;
          console.log("delete location"+task.lc_name);
          deleteList.push(task);
        deletename=task.lc_name;
          setLocation_list(location_list.filter(location=>location.lc_id!==taskId));
          //list=category_list;
          //list.splice(i,1);
          break;
        }
       }
     }
     console.log("After delete");
     /*for(var i=0; i<list.length; i++){
       console.log("category:"+list[i].category);
     }*/
     //setCategory_list(list);
      let mem_idnum=bk_key.mem_idnum;
      let bk_id=bk_key.bk_id;
      fetch('http://'+localhost+':8080/bucketlist/delete',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mem_idnum : mem_idnum,
        bk_id:bk_id,
        bucketlistContentsList:deleteList,
        }),
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        
        console.log('Delete response:'+JSON.stringify(responseJson));
        
      })
        .catch((error) => {
          console.error(error);
        })
  }


    useEffect(()=>{
      AsyncStorage.getItem('userInfo',(err,result)=>{
        const userInfo=JSON.parse(result);
        setBk_key({mem_idnum:userInfo.mem_idnum,bk_id:userInfo.bucketlist.bk_id});
        setNickname(userInfo.nickname);
        //setMem_idnum(userInfo.mem_idnum);
        //setBk_id(userInfo.bucketlist.bk_id);

      });

    },[]);

    useEffect(()=>{
      setLoading(true);
      let mem_idnum=bk_key.mem_idnum;
      let bk_id=bk_key.bk_id;
      console.log('mem_idnum:'+mem_idnum);
      console.log('bk_id:'+bk_id);
      fetch('http://'+localhost+':8080/bucketlist/show',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mem_idnum : mem_idnum,
        bk_id:bk_id
        }),
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        setLoading(false);
        setBucketlistContentsList(responseJson.bucketlistContentsList);
        console.log('responseJson.bucketlistContentsList:',responseJson.bucketlistContentsList);
        
        })
        .catch((error) => {
          console.error(error);
        })
      //});
    },[bk_key]);

    useEffect(()=>{
      let lc_list=[];
      let cg_list=[];
      for(var i=0; i<bucketlistContentsList.length; i++){
        var task=new Object();
        if(bucketlistContentsList[i].lc_id[0]=='-'){
          task.category=bucketlistContentsList[i].category;
          task.category_id=bucketlistContentsList[i].category_id;
          task.lc_name=bucketlistContentsList[i].lc_name;
          task.lc_id=bucketlistContentsList[i].lc_id;
          task.id=i+1;
          cg_list.push(task);
        }
        else{
          task.category=bucketlistContentsList[i].category;
          task.category_id=bucketlistContentsList[i].category_id;
          task.lc_name=bucketlistContentsList[i].lc_name;
          task.lc_id=bucketlistContentsList[i].lc_id;
          task.id=-1*(i+1);  
          lc_list.push(task);
        }
      }
      setCategory_list(cg_list);
      setLocation_list(lc_list);
    },[bucketlistContentsList])
    
    const _handleTextChange=text=>{
        setNewList(text);
    };

    return(
        <ThemeProvider theme={theme}>
          <Container>
          <View style={StyleList.Container}>
              <View style={StyleList.profileHeader}>
                <View style={{flexDirection:'row'}}>
                  <View style={StyleList.profileHeaderPicCircle}>
                    <Text style={{fontSize: 25, color: 'aquamarine'}}>
                        {'About React'.charAt(0)}   
                    </Text>
                  </View>
                  <Text style={StyleList.profileHeaderText}>{nickname}</Text>
                  </View>
                  <View>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => {
                        AsyncStorage.setItem('autologin','0');
                        navigation.navigate('Auth')
                      }} // Details로 화면 이동    
                      
                  >
                        <Image source={require('./assets/icons/bucketlistImage/logout.png')}
                          style={{width:25, height:25}}
                        />
                     
                    </TouchableOpacity>
                    </View>
              </View>
              
              
              <View style={{flexDirection:'row', borderBottomColor:'gray',borderBottomWidth: 1, borderBottomLeftRadius:12,
            borderBottomRightRadius:12,justifyContent: 'space-between',}}>
                  <Text style={{margin:10, fontWeight: 'bold', fontSize:25}}>Bucket List</Text>
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => navigation.navigate('AddList')} // Addlist로 화면 이동    
                  >
                    <Image source={require('./assets/icons/bucketlistImage/plus.png')}
                          style={{width:25, height:25}}
                        />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => navigation.navigate('Recommend')} // Details로 화면 이동    
                  >
                    <Image source={require('./assets/icons/bucketlistImage/recommend.png')}
                          style={{width:25, height:25}}
                        />
                  </TouchableOpacity>
                  </View>
              </View>
              <View style={{height:50}}>
              <Text style={{margin:10, fontWeight: 'bold', fontSize:20}}>My Category</Text>
              </View>
              <View style={{height:200, marginLeft:20}}>
                <List width={width}>
                  {
                   // /*
                  Object.values(category_list)
                  .reverse()
                  .map((item)=>(
                    <Task id={item.id} key={item.id} name={item.category}  deleteTask={_deleteAlert} />
                  ))
               // */
                }
                </List>
              </View>

              <View style={{height:50}}>
              <Text style={{margin:10, fontWeight: 'bold', fontSize:20}}>My Place</Text>
              </View>
              <View style={{height:200, marginLeft:20}}>
                <List width={width}>
                  {
                   // /*
                  Object.values(location_list)
                  .reverse()
                  .map((item)=>(
                    <Task id={item.id} key={item.id} name={item.lc_name} category={item.category}  deleteTask={_deleteAlert} searchTask={_LookDetails} />
                  ))
               // */
                }
                </List>
              </View>
             
              
          </View>
          </Container>
        </ThemeProvider>
    );
}

const Container=styled.SafeAreaView`
  flex:1;
  background-color:${({theme})=>theme.background};
  align-items:center;
  justify-content:flex-start;
`;

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
        height:80,
        borderBottomColor:'black',
        borderBottomWidth:1,
        justifyContent: 'space-between',
      },
      profileHeaderPicCircle: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
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
        //backgroundColor:"#DDDDDD",
        flexDirection: 'row',
        margin:15,
        //padding:10,
        //width:80,
        height:25,
        marginBottom:20,
      },
      ButtonText:{
        fontSize:15
      }
});