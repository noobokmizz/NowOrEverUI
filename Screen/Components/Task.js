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

const Task=({text})=>{
    return(
        <Container>
            <Contents style={{marginLeft:10}}>{text}</Contents>
            <IconButton type={images.search}/>
            <IconButton type={images.delete}/>
        </Container>
    );
};

Task.propTypes={
    text:PropTypes.string.isRequired,
};

export default Task;