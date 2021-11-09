import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {images, soccer} from '../src/images';

const Icon=styled.Image`
  tint-color:${({theme})=>theme.text};
  width:30px;
  height:30px;
  margin:10px;
`;

const Emoticon = ({type,id})=>{
    return(
        <Icon source={type}/>
    );
};

Emoticon.propTypes={
    type:PropTypes.oneOf(Object.values(soccer)).isRequired,
    
    id:PropTypes.string,
};

export default Emoticon;