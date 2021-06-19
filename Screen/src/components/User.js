import React from 'react';
import styled from 'styled-components/native';
import UserContext from '../context/User';
import {UserConsumer} from '../context/User';

const StyledText = styled.Text`
    font-size:24px;
    margin:10px;
    `;

const User=()=>{
    return(
        <UserContext.Consumer>
            {({user})=><StyledText>Name:{user.name}</StyledText>
            //value=><StyledText>Name:{value.name}</StyledText>}
            }
        </UserContext.Consumer>
    )
}

export default User;