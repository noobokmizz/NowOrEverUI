import {createContext} from 'react';

const UserContext=createContext({
    user:{large:'',
    middle:'',
    small:'',
    name:''},
    dispatch:()=>{},
});

const UserProvider = ({children})=>{
    const [large, setLarge]=useState('food');
    const [middle, setMiddle]=useState('italy');
    const [small, setSmall]=useState('food');
    const [name, setName]=useState('food');

    const value={user:{large,middle,small,name},dispatch:setName};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer=UserContext.Consumer;

export {UserProvider, UserConsumer};
export default UserContext