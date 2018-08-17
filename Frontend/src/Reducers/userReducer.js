import { USER_LOGGEDIN } from '../Actions/userActions';
import { FETCH_USER } from '../Actions/userActions';

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_LOGGEDIN:
            return { ...state, ...action.payload };

        case FETCH_USER:
            return { ...state, ...action.payload };


        default: return state;
    }

}

export default userReducer;