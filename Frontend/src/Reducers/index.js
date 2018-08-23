import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import questionsReducer from './questionsReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    posts: postReducer,
    category: categoryReducer,
    user: userReducer,
    questions: questionsReducer
});


export default allReducers;