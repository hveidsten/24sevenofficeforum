import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    posts:postReducer,
    category: categoryReducer,
    user: userReducer,
});


export default allReducers;