import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import {combineReducers} from 'redux';


const allReducers = combineReducers({
    posts:postReducer,
    category: categoryReducer
});


export default allReducers;