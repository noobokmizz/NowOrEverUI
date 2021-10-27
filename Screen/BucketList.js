import React, {useState, createRef,useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';
import {Input,ContextInput} from './src/components/Input';
//import ContextInput from './src/components/Input';
import {Button, View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {StatusBar,Dimensions} from 'react-native';
import Task from './Components/Task';
import AsyncStorage from '@react-native-community/async-storage';

import {localhost} from '../App';
/*
const Container=styled.SafeAreaView `
    flex:1;
    background-color: ${({theme})=>theme.background};
    align-items:center;
    justify-content:flex-start;
`;

const Title = styled.Text `
    font-size:40px;
    font-weight:600;
    color:${({theme})=>theme.main};
    align-self:flex-start;
    margin:0px 20px;
    `;
*/

const List = styled.ScrollView`
  flex:1;
  width: ${({width})=>width-40}px;
`;


export const BucketList=({navigation})=>{
    const width=Dimensions.get('window').width;

    const [mem_idnum,setMem_idnum]=useState('');
    const [bk_id,setBk_id]=useState(0);
    const [bucketlistContentsList,setBucketlistContentsList]=useState([]);
    const [category_list,setCategory_list]=useState([]);
    const [location_list,setLocation_list]=useState([]);
    const [delete_list,setDelete_list]=useState([]);
    const [tasks,setTasks]=useState([{text:'',id:''}]);
    const [loading, setLoading] = useState(false);
  
    const _deleteTask = id => {
      /*
      const currentTasks=Object.assign({},category_list);
      delete currentTasks[id];
      setTasks(currentTasks);
      */
     let deleteList=[];
     var task=new Object();
     for(var i=0; i<category_list.length; i++){
       if(category_list[i].lc_id==id){
          task.category_id=category_list[i].category_id;
          task.category=category_list[i].category;
          task.lc_id=category_list[i].lc_id;
          task.lc_name=category_list[i].lc_name;
          task.id=i;
          deleteList.push(task);
          console.log("delete "+task.category);
          setCategory_list(category_list.splice(i,1));
          setDelete_list(deleteList);
          break;
       }
     }
     for(var i=0; i<location_list.length; i++){
      if(location_list[i].lc_id==id){
         task.category_id=location_list[i].category_id;
         task.category=location_list[i].category;
         task.lc_id=location_list[i].lc_id;
         task.lc_name=location_list[i].lc_name;
         task.id=i;
         deleteList.push(task);
         console.log("delete "+task.lc_name);  
         setLocation_list(location_list.splice(i,1));
         setDelete_list(deleteList);
         break;
      }
    }
  }
    useEffect(()=>{
     fetch('http://'+localhost+':8080/bucketlist/delete',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mem_idnum : mem_idnum,
        bk_id:bk_id,
        bucketlistContentsList:delete_list,
        }),
      })
      .then((response) => response.json())
      .then((responseJson)=>{
        console.log(JSON.stringify({
          mem_idnum : mem_idnum,
          bk_id:bk_id,
          bucketlistContentsList:delete_list,
          }));
        console.log('Delete response:'+responseJson);
        })
        .catch((error) => {
          console.error(error);
        })
    
  },[delete_list]);

    useEffect(()=>{
      AsyncStorage.getItem('userInfo',(err,result)=>{
        const userInfo=JSON.parse(result);
        setMem_idnum(userInfo.mem_idnum);
        setBk_id(userInfo.bucketlist.bk_id);
      });
    });

    useEffect(()=>{
      setLoading(true);
      console.log('mem_idnum:'+mem_idnum); console.log('bk_id:'+bk_id);
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
    },[mem_idnum,bk_id]);

    useEffect(()=>{
      let lc_list=[];
      let cg_list=[];
      for(var i=0; i<bucketlistContentsList.length; i++){
        if(bucketlistContentsList[i].lc_id>0){
          lc_list.push(bucketlistContentsList[i]);
        }
        else{
          cg_list.push(bucketlistContentsList[i]);  
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
                  <View style={StyleList.profileHeaderPicCircle}>
                  <Text style={{fontSize: 25, color: 'aquamarine'}}>
                      {'About React'.charAt(0)}   
                  </Text>
                  </View>
                  <Text style={StyleList.profileHeaderText}>admin</Text>
              </View>
              <View>
                
              </View>
              <View style={{flexDirection:'row', borderBottomColor:'gray',borderBottomWidth: 1, borderBottomLeftRadius:12,
            borderBottomRightRadius:12}}>
                  <Text style={{margin:10, fontWeight: 'bold', fontSize:25}}>Bucket List</Text>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => navigation.navigate('AddList')} // Details로 화면 이동    
                  >
                    <Text style={StyleList.ButtonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => navigation.navigate('Suggest')} // Details로 화면 이동    
                  >
                    <Text style={StyleList.ButtonText}>Suggest</Text>
                  </TouchableOpacity>
              </View>
              <View style={{height:50}}>
              <Text style={{margin:10, fontWeight: 'bold', fontSize:20}}>My list</Text>
              </View>
              <View style={{height:200, marginLeft:20}}>
                <List width={width}>
                  {Object.values(location_list)
                  .reverse()
                  .map((item)=>(
                    <Task id={item.lc_id} key={item.id} name={item.lc_name}  deleteTask={_deleteTask} />
                  ))}
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