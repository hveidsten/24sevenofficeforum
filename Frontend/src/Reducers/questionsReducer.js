import { QUESTIONS_ARE_LOADED, FETCH_QUESTIONS_SUCCESS,NEW_QUESTION,FETCH_QUESTION, EDIT_QUESTION, DELETE_QUESTION } from '../Actions/questionActions';

const initialState = [];

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

        case FETCH_QUESTION:
            return {
                ...state,
                activeQuestion: { ...action.payload, hasBeenPosted: false }
            }

        case NEW_QUESTION: return {
            ...state,
            activeQuestion: { ...action.payload, hasBeenPosted: true }
        }

        case EDIT_QUESTION: return {
            ...state,
            activeQuestion: { ...action.payload, hasBeenPosted: true }
        }

        case DELETE_QUESTION: return {
            ...state,
            allQuestionsInCategory: [...state.allQuestionsInCategory.filter(q => q.id !== action.payload)]
        }


        default: return state;
    }
}