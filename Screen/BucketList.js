import React, {useState, createRef} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './src/theme';
import Input from './src/components/Input';
import {Button, View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {StatusBar,Dimensions} from 'react-native';
import Task from './Components/Task';
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
    const [newTask,setNewTask]=useState('');
    const _addTask=()=>{
        alert(`Add:${newTask}`);
        setNewTask('');
    };
    const _handleTextChange=text=>{
        setNewTask(text);
    };
/***********************************************
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      user_name: userName,
      user_email: userEmail,
      user_age: userAge,
      user_password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://172.22.208.1:8080/api/user/register', {
		method: 'POST',
		body: JSON.stringify({
			mem_name : userName,
			mem_email : userEmail,
			mem_age : userAge,
			mem_password : userPassword
			}),
		headers: {
			//Header Defination
			'Content-Type': 'application/json',
		},
	})
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
***********************************************/
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
              <View style={{flexDirection:'row'}}>
                  <Text style={{margin:10, fontWeight: 'bold', fontSize:25}}>Bucket List</Text>
                  <TouchableOpacity
                      style={StyleList.button}
                      onPress={() => navigation.navigate('AddList')} // Details로 화면 이동    
                  >
                    <Text style={StyleList.ButtonText}>Add to BucketList</Text>
                  </TouchableOpacity>
              </View>
              
              <View style={{height:400, margin:10}}>
                <List width={width}>
                  <Task text="hmm" />
                  <Task text="very" />
                  <Task text="tired" />
                  <Task text="hmm" />
                  <Task text="very" />
                  <Task text="tired" />
                  <Task text="hmm" />
                  <Task text="very" />
                  <Task text="tired" />
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