import { USER_SIGN_IN } from '../Actions/userActions';
import { USER_SIGN_OUT } from '../Actions/userActions';
import { FETCH_USER, EDIT_USER } from '../Actions/userActions';

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGN_IN:
            return { ...state, loggedInUser: action.payload };

        case USER_SIGN_OUT:
            return { ...state, loggedInUser: null }

        case FETCH_USER:
            return { ...state, displayedUser: action.payload };

        case EDIT_USER:
            return { ...state, loggedInUser: action.payload };

        default: return state;
    }
}

export default userReducer;