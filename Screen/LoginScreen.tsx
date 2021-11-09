// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import { RadioButton } from 'react-native-paper';
import Loader from './Components/Loader';
import {localhost} from '../App';

const LoginScreen = ({navigation}) => {
  const [mem_userid, setMem_userid] = useState('');
  const [mem_password, setMem_password] = useState('');
  const [autologin,setAutologin]=useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!mem_userid) {
      alert('Please fill ID');
      return;
    }
    if (!mem_password) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    
    console.log('http://'+localhost+':8080/user/login');
    fetch('http://'+localhost+':8080/user/login', {
		method: 'POST',
		body: JSON.stringify({
			mem_userid : mem_userid,
			mem_password : mem_password
			}),
		
    headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
			'Content-Type': 'application/json',
		},
    
	})
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        if (responseJson.status == 1) {
         AsyncStorage.setItem('userInfo',JSON.stringify(responseJson.data));
          console.log("userInfo:"+JSON.stringify(responseJson.data));
          if(autologin)
            AsyncStorage.setItem("autologin",'1');
          else
            AsyncStorage.setItem("autologin",'0');
          navigation.replace('TabNavigation');
        } else {
          setErrortext('Please check your email id or password');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Image/bucket.png')}
                style={{
                  width: '100%',
                  height: 200,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(mem_userid) => setMem_userid(mem_userid)}
                placeholder="Enter ID" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                //keyboardType="email-address"
                returnKeyType="next"
                //onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setMem_password(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                //ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text>
                Autologin
                </Text>
              <CheckBox
                style={styles.checkStyle}
               disabled={false}
               value={autologin}
               onValueChange={(newValue) => setAutologin(newValue)}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'aqua',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'blue',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  checkStyle:{
    marginLeft:10
  },
  registerTextStyle: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
