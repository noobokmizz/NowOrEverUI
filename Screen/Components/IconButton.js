import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {images} from '../src/images';

const Icon=styled.Image`
  width:30px;
  height:30px;
  margin:10px;
`;
//tint-color:${({theme})=>theme.text};

const IconButton = ({type,id, onPressOut})=>{
    const _onPressOut=()=>{
        onPressOut(id);
    };
    return(
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon source={type}
                style={{width:25, height:25}}
            />
        </TouchableOpacity>
    );
};

IconButton.propTypes={
    type:PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut:PropTypes.func,
    id:PropTypes.string,
};

export default IconButton;