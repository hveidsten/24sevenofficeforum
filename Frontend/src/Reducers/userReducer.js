import { USER_LOGGEDIN } from '../Actions/userActions';

const userReducer = (state={isLoggedIn:true, userName:"Brukernavn"},action) => {

    switch(action.type){
       
        case USER_LOGGEDIN: 
        return {...state, ...action.payload};
        default: return state;
    }
}

export default userReducer;