import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import questionsReducer from './questionsReducer';
import answerReducer from './answerReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    posts: postReducer,
    category: categoryReducer,
    user: userReducer,
    questions: questionsReducer,
    answers: answerReducer
});


export default allReducers;