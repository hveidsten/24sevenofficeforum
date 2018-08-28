import { FETCH_ANSWERS, CREATE_ANSWER, EDIT_ANSWER, DELETE_ANSWER} from '../Actions/answerActions';
const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCH_ANSWERS:
        return  [ ...action.payload];

        case CREATE_ANSWER: return  [ 
           ...state, action.payload] ;

        case EDIT_ANSWER: return [
               ...state.map(c => c.id === action.payload.id ?
                    { ...c, body: action.payload.body } : c)];
            
       

        case DELETE_ANSWER: return [
            ...state.filter(a => a.id !== action.payload) 
        ];

        default: return state;
    }
}