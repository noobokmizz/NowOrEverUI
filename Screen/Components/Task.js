import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../src/images';

const Container=styled.View`
    flex-direction:row;
    align-items:center;
    background-color:${({theme})=>theme.itemBackground};
    border-radius:10px;
    padding:5px;
    margin:3px 0px;
`;

const Contents=styled.Text`
    flex:1;
    font-size:24px;
    color: ${({theme})=>theme.text};
    `;

const Task=({name,deleteTask,id})=>{
    console.log("name:"+name);
    console.log("id:"+id);
    return(
        <Container>
            <Contents style={{marginLeft:10}}>{name}</Contents>
            <IconButton type={images.search}/>
            <IconButton type={images.delete}  id={id} onPressOut={deleteTask}/>
        </Container>
    );
};

Task.propTypes={
    text:PropTypes.string.isRequired,
    deleteTask:PropTypes.func.isRequired,
};

export default Task;