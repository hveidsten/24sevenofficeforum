import { FETCH_ANSWERS, CREATE_ANSWER, EDIT_ANSWER, DELETE_ANSWER} from '../Actions/answerActions';
const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCH_ANSWERS:
        return  [ ...action.payload];

        case CREATE_ANSWER: return {
            ...state,
            activeQuestion: { ...state.questions.activeQuestion, answer: [ { ...action.payload },...state.questions.activeQuestion.answer] }
        }

        case EDIT_ANSWER: return {
            ...state,
            activeQuestion: {
                ...state.questions.activeQuestion, answer: [...state.questions.activeQuestion.answer.map(c => c.id === action.payload.id ?
                    { ...c, body: action.payload.body } : c)]
            }
        }

        case DELETE_ANSWER: return {
            ...state,
            activeQuestion: { ...state.activeQuestion, answer: [...state.activeQuestion.answer.filter(a => a.id !== action.payload)] }
        }

        default: return state;
    }
}