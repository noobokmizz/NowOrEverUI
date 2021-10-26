import {AppState} from './AppState'
import type {LoginActions} from './actions'

const initialState: AppState={
    loggedIn:false,
    loggedUser:{idnum:0, name:"", age:"", email:"",password:"",bk_id:0,bk_name:""}
}

//prettier-ignore
export const rootReducer=
    (state:AppState = initialState, action: LoginActions)=>{
        return state;
    }