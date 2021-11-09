import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images,soccer} from '../src/images';
import Emoticon  from './Emoticon';
import Icon from 'react-native-vector-icons'
import image from '../assets/icons/emoticons/tmp_soccer.png';
import {Image, View, Text} from 'react-native';

const Container=styled.View`
    flex-direction:row;
    align-items:center;
    border-radius:10px;
    padding:5px;
    margin:3px 0px;
`;

//background-color:steelblue;
//background-color:${({theme})=>theme.itemBackground};
    
const Contents=styled.Text`
    flex:1;
    font-size:24px;
    color:black;
    font-weight:bold;
    `;
//color: ${({theme})=>theme.text};
const Task=({name,deleteTask,searchTask,id,category})=>{
    return(
        <Container>
            <View>
            <Image
                source={require('../assets/icons/emoticons/tmp_soccer.png')}
                style={{width:25, height:25}}
            />
            </View>
            <View style={{width:230}}>
            <Contents style={{marginLeft:10}}>{name}</Contents>
            <Text style={{marginLeft:10}}>{id<0?category:''}</Text>
            </View>
            <View>
            <IconButton type={require('../assets/icons/delete_and_search/search.png')}  id={id} onPressOut={searchTask}/>
            </View>
            <View>
                <IconButton type={require('../assets/icons/delete_and_search/delete.png')}  id={id} onPressOut={deleteTask}/>
           </View>
        </Container>
    );
};

Task.propTypes={
    name:PropTypes.string.isRequired,
    text:PropTypes.string.isRequired,
    deleteTask:PropTypes.func.isRequired,
};

export default Task;