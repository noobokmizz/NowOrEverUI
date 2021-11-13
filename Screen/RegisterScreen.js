// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Loader from './Components/Loader';
import {localhost} from '../App';

const RegisterScreen = (props) => {
  const [mem_userid, setMem_userid] = useState('');
  const [mem_email, setMem_email] = useState('');
  const [mem_nickname, setMem_nickname] = useState('');
  const [mem_sex, setMem_sex] = useState(-1);
  const [mem_birthday, setMem_birthday] = useState('');
  const [mem_password, setMem_password] = useState('');
  const [mem_username, setMem_username] = useState('');
  const [mem_autologin, setMem_autologin] = useState(-1);
  const [mem_phone, setMem_phone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!mem_userid) {
      alert('Please fill id');
      return;
    }
    if (!mem_email) {
      alert('Please fill email');
      return;
    }
    if (!mem_nickname) {
      alert('Please fill nickname');
      return;
    }
    if (mem_sex==-1) {
      alert('Please check sex');
      return;
    }
    if (!mem_birthday) {
      alert('Please fill birth');
      return;
    }
    if (!mem_password) {
      alert('Please fill password');
      return;
    }
    if (!mem_username) {
      alert('Please fill name');
      return;
    }
    if (mem_autologin==-1) {
      alert('Please check autologin');
      return;
    }
    if (!mem_phone) {
      alert('Please fill phone number');
      return;
    }
    //Show Loader
    setLoading(true);
    /*var dataToSend = {
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
    */
    fetch('http://'+localhost+':8080/user/register', {
		method: 'POST',
		body: JSON.stringify({
			// mem_name : userName,
			// mem_email : userEmail,
			// mem_age : userAge,
			// mem_password : userPassword,
      mem_userid : mem_userid,
      mem_email : mem_email,
      mem_nickname : mem_nickname,
      mem_sex : mem_sex,
      mem_birthday : mem_birthday,
      mem_password : mem_password,
      mem_username : mem_username,
      mem_autologin : mem_autologin,
      mem_phone : mem_phone
			}),
		headers: {
			//Header Defination
			'Content-Type': 'application/json',
		},
	})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("mem_userid:"+mem_userid);
        console.log("mem_email:"+ mem_email);
        console.log("mem_nickname:"+mem_nickname);
        console.log("mem_sex:"+mem_sex);
        console.log("mem_birthday:"+mem_birthday);
        console.log("mem_password:"+mem_password);
        console.log("mem_username:"+mem_username);
        console.log("mem_autologin:"+mem_autologin);
        console.log("mem_phone:"+mem_phone);
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
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#lightsteelblue',
          justifyContent: 'center',
        }}>
        <Image 
          source={require('../Image/success.png')}
          style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'aliceblue'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Image/bucket.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Text style={styles.textStyle}>
              이름
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(mem_username) => setMem_username(mem_username)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              아이디
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(mem_userid) => setMem_userid(mem_userid)}
              underlineColorAndroid="#f000"
              placeholder="Enter id"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              Email
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setMem_email(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              비밀번호
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setMem_password(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              닉네임
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Nickname) => setMem_nickname(Nickname)}
              underlineColorAndroid="#f000"
              placeholder="Enter Nickname"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              생년월일
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Birth) => setMem_birthday(Birth)}
              underlineColorAndroid="#f000"
              placeholder="Enter Birth"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <View style={styles.radioStyle}>
              <Text style={styles.genderText}>
                남자
              </Text>
              <RadioButton
                value="male"
                status={ mem_sex === 0 ? 'checked' : 'unchecked' }
                onPress={() => setMem_sex(0)}
              />
            </View>
              <View style={styles.radioStyle}>
                <Text style={styles.genderText}>
                  여자
                </Text>
                <RadioButton
                  style={styles.radioStyle}
                  value="female"
                  status={ mem_sex === 1 ? 'checked' : 'unchecked' }
                  onPress={() => setMem_sex(1)}
                />
              </View>
          </View>
         
          <View style={styles.SectionStyle}>
          <Text style={styles.textStyle}>
              전화번호
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phone) => setMem_phone(phone)}
              underlineColorAndroid="#f000"
              placeholder="Enter Phone number"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {/*<View style={styles.SectionStyle}>
            <Text style={styles.textStyle}>
              자동로그인
            </Text>
            <Text style={styles.genderText}>
              예
            </Text>
            <RadioButton
              value="yes"
              status={ mem_autologin === 1 ? 'checked' : 'unchecked' }
              onPress={() => setMem_autologin(1)}
            />
            <Text style={styles.genderText}>
              아니오
            </Text>
            <RadioButton
              value="no"
              status={ mem_autologin === 0 ? 'checked' : 'unchecked' }
              onPress={() => setMem_autologin(0)}
            />
          </View>*/}
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: 'lightskyblue',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: 'blue',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle:{
    flex: 0.3,
    color: 'black',
    marginLeft:5,
    marginRight:5,
    marginTop:5,
    fontWeight: 'bold',
    //paddingLeft: 5,
    //paddingRight: 5,
    //borderWidth: 1,
    //borderRadius: 30,
    //borderColor: '#dadae8',
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
  genderText:{
    color: 'black',
    marginLeft:5,
    //marginRight:2,
    marginTop:5,
    fontWeight: 'bold',
  },
  radioStyle:{
    flexDirection: 'row',
    //flex:0.5,
    marginLeft: 5,
    //marginRight: 5,
    //margin: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});