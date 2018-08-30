import { FETCH_USER, EDIT_USER, FETCH_USERS, USER_SIGN_OUT, USER_SIGN_IN } from '../Actions/userActions';

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

        case FETCH_USERS:
            return { ...state, allUsers: action.payload };

        default: return state;
    }
}

export default userReducer;