import { FETCH_POSTS, FETCH_POST, NEW_POST, EDIT_POST, DELETE_POST, NEW_ANSWER, DELETE_ANSWER, EDIT_ANSWER, FETCH_ANSWERS } from '../Actions/postActions'
const initialState = {
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                allQuestionsInCategory: [...action.payload]
            }

        case FETCH_POST:
            return {
                ...state,
                activeQuestion: { ...action.payload, hasBeenPosted: false }
            }

        case FETCH_ANSWERS:
            return {
                ...state,
                activeQuestion: { ...state.activeQuestion, answer: [...action.payload] }
            }

        case NEW_POST: return {
            ...state,
            activeQuestion: { ...action.payload, hasBeenPosted: true }
        }

        case NEW_ANSWER: return {
            ...state,
            activeQuestion: { ...state.activeQuestion, answer: [ { ...action.payload },...state.activeQuestion.answer] }
        }

        case EDIT_POST: return {
            ...state,
            activeQuestion: { ...action.payload, hasBeenPosted: true }
        }

        case DELETE_POST: return {
            ...state,
            allQuestionsInCategory: [...state.allQuestionsInCategory.filter(q => q.id !== action.payload)]
        }

        case DELETE_ANSWER: return {
            ...state,
            activeQuestion: { ...state.activeQuestion, answer: [...state.activeQuestion.answer.filter(a => a.id !== action.payload)] }
        }

        case EDIT_ANSWER: return {
            ...state,
            activeQuestion: {
                ...state.activeQuestion, answer: [...state.activeQuestion.answer.map(c => c.id === action.payload.id ?
                    { ...c, body: action.payload.body } : c)]
            }
        }

        default: return state;
    }
}