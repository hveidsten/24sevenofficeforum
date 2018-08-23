import { USER_SIGN_IN } from '../Actions/userActions';
import { FETCH_USER } from '../Actions/userActions';

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGN_IN:
            return { ...state, loggedInUser: action.payload };

        case FETCH_USER:
            return { ...state, displayeduser: action.payload };

        default: return state;
    }
}

export default userReducer;