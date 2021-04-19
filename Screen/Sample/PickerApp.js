/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Fragment, Component} from 'react';
 import {Picker} from 'react-native';
 import RNPickerSelect from 'react-native-picker-select';
 //import SelectBox from 'react-native-multi-selectbox'
 import {
   StyleSheet,
   View,
   Image,
   Text,
 } from 'react-native';
 class App extends Component{
   render(){
     return(
       <View style= {styles.container}>
            <View style= {styles.title}>
              <Picker>
                <Picker.Item label="대분류" value="0"></Picker.Item>
                <Picker.Item label="React" value="8000"></Picker.Item>
                <Picker.Item label="PHP" value="7000"></Picker.Item>
                <Picker.Item label="HTML" value="6000"></Picker.Item>
              </Picker>
            </View>
            <View style= {styles.title}>
              <Picker>
                <Picker.Item label="중분류" value="0"></Picker.Item>
                <Picker.Item label="React" value="8000"></Picker.Item>
                <Picker.Item label="PHP" value="7000"></Picker.Item>
                <Picker.Item label="HTML" value="6000"></Picker.Item>
              </Picker>
            </View>
            <View style= {styles.title}>
              <Picker>
                <Picker.Item label="소분류" value="0"></Picker.Item>
                <Picker.Item label="React" value="8000"></Picker.Item>
                <Picker.Item label="PHP" value="7000"></Picker.Item>
                <Picker.Item label="HTML" value="6000"></Picker.Item>
              </Picker>
            </View>
       </View>
     );
   }
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
 
 export default App;
 