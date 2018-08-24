import { FETCH_ANSWERS} from '../Actions/answerActions';
const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCH_ANSWERS:
        return  [ ...action.payload];
         
        default: return state;
    }
}