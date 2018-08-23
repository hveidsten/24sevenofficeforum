import { QUESTIONS_ARE_LOADED, FETCH_QUESTIONS_SUCCESS } from '../Actions/questionActions'
const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {

        case QUESTIONS_ARE_LOADED: return {
            ...state,
           isLoaded: action.isLoaded
        };

        case FETCH_QUESTIONS_SUCCESS: 
        return {
            ...state,
            allQuestionsInCategory: [...action.questions]
        };

        default: return state;
    }
}