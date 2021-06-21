import React, {useState} from 'react';
import HTML from "react-native-render-html";
import Geolocation from '@react-native-community/geolocation';
import { ScrollView, useWindowDimensions } from "react-native";

const PrintPath = ({navigation}) => {
    const [mem_idnum,setMem_idnum]=useState('');
    const [cur_x,setCur_x]=useState('');
    const [cur_y,setCur_y]=useState('');
    const [dest_id,setDest_id]=useState('');
    const [htmlcontent,setHtmlcontent]=useState('');
    const contentWidth = useWindowDimensions().width;
    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude);
                const longitude = JSON.stringify(position.coords.longitude);
                //cur_y=latitude;
                //cur_x=longitude;
                setCur_y(latitude);
                setCur_x(longitude);
            },
            error => { console.log(error.code, error.message); },
            {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    }
    useEffect(()=>{
        AsyncStorage.getItem('mem_idnum',(err,result)=>{
            setMem_idnum(result);
          });
          AsyncStorage.getItem('dest_id',(err,result)=>{
            setDest_id(result);
          });
        fetch('http://3.35.217.247:8080/api/bucketlist/reclist',{
            method:'POST',
            headers: { // header에 로그인 후 서버로 부터 받은 토큰 저장(생략가능)
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mem_idnum : mem_idnum,
              cur_x:cur_x,
              cur_y:cur_y
              }),
        }.
        then((response) => response.json())
        .then((responseJson)=>{
            setHtmlcontent(responseJson);
        };
    },[mem_idnum,htmlcontent]);
    return (
        <ScrollView style={{ flex: 1 }}>
          <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
        </ScrollView>
      );
}