import React, {useState, createRef,useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';
import {Input,ContextInput} from './src/components/Input';
//import ContextInput from './src/components/Input';
import {Button, View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {StatusBar,Dimensions} from 'react-native';
import Task from './Components/Task';
import AsyncStorage from '@react-native-community/async-storage';
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
    const [newList,setNewList]=useState('');
    const [lists, setLists]=useState([]);
    const [mem_idnum,setMem_idnum]=useState('');
    const [category_list,setCategory_list]=useState([]);
    const [location_list,setLocation_list]=useState([]);
    const [tasks,setTasks]=useState([{text:'',id:''}]);
    const _deleteTask = id => {
      const currentTasks=Object.assign({},category_list);
      delete currentTasks[id];
      setTasks(currentTasks);
    };
    useEffect(async ()=>{
      if(tasks==[])
        return;
      AsyncStorage.getItem('mem_idnum',(err,result)=>{
        if(result!=mem_idnum)
          setMem_idnum(result);
        console.log('result:',result);
      });
      await fetch('http://3.35.217.247:8080/api/bucketlist/list',{
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
        console.log('idnum:',mem_idnum);
        console.log('wht not fetch?');
        const category= responseJson.only_category;
        const location=responseJson.location;
        //setCategory_list(category);
        console.log('responseJson:',responseJson);
        console.log('response:',responseJson.only_category);
        
      
          //console.log('response:',responseJson.only_category);
          console.log('category:',category);
          console.log('send list:',category_list);
          let category_array=[];
          let location_array=[];
          let i;
          for(i=0; i<category.length; i++){
            category_array.push({text:category[i].cs_activity, id:category[i].cs_id});
          }
          for(i=0; i<location.length; i++){
            location_array.push({text:location[i].lc_name, id:location[i].lc_id});
          }
          setCategory_list(category_array);
          setLocation_list(location_array);
          console.log('show task list:',category_list);
        })
        .catch((error) => {
        //console.error(error);
      });
    },[mem_idnum]);
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
                    <Text style={StyleList.ButtonText}>Add to BucketList</Text>
                  </TouchableOpacity>
              </View>
              
              <View style={{height:200, marginLeft:20}}>
                <List width={width}>
                  {Object.values(category_list)
                  .reverse()
                  .map(item=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} />
                  ))}
                </List>
              </View>
              <View style={{height:50}}/>
              <View style={{height:200, marginLeft:20}}>
                <List width={width}>
                  {Object.values(location_list)
                  .reverse()
                  .map(item=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} />
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
        width:150,
        height:25,
      },
      ButtonText:{
        fontSize:15
      }
});