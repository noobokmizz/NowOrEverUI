import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images,soccer} from '../src/images';
import Icon from 'react-native-vector-icons'
import image from '../assets/icons/emoticons/tmp_soccer.png';
import {
    Image, 
    View, 
    Text,
    Dimensions
} from 'react-native';
import category_images from '../assets/icons/category_images';
import CheckBox from '@react-native-community/checkbox';

const Container=styled.View`
    flex-direction:row;
    align-items:center;
    border-bottom-color:gray;
    border-bottom-width:1;
    padding:5px;
    margin:3px 0px;
`;
//border-radius:10px;
//background-color:steelblue;
//background-color:${({theme})=>theme.itemBackground};
    
const Contents=styled.Text`
    flex:1;
    font-size:24px;
    color:black;
    font-weight:bold;
    `;
//color: ${({theme})=>theme.text};

const Task=({name,deleteTask,searchTask,id,category,categoryId})=>{
    const chartWidth = Dimensions.get('window').width;
    return(
        <Container>
            <View>
                <Image
                    //source={{uri:'../assets/icons/category_images/category_${categoryId.toString()}.png'}}
                    //source={{uri:'../assets/icons/category_images/category_'+categoryId.toString()+'.png'}}
                    //source={require('../assets/icons/category_images/category_${categoryId.toString()}.png').default}
                    source={category_images[categoryId.toString()]}
                    style={{width:35, height:35, borderRadius:17}}
                />
            </View>
            <View style={{width:chartWidth-160, marginLeft:10}}>
                <Contents>{name}</Contents>
                <Text>{id<0?category:''}</Text>
            </View>
            {
                (id<0)&&<View style={{width:15}}>
            
              <IconButton type={require('../assets/icons/delete_and_search/search.png')}  id={id} onPressOut={searchTask}/>
            
            </View>
            }<View style={{width:15, marginLeft:15}}>
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