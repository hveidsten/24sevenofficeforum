import {FETCH_POSTS,FETCH_POST, NEW_POST, EDIT_POST, DELETE_POST} from '../Actions/types'

const initialState = {
    
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_POSTS: 
        return {
            ...state,
            allQuestionsInCategory: action.payload
        }

        case FETCH_POST: 
        return {
            ...state,
            activeQuestion: {...action.payload}
        }
        
        case NEW_POST: return {
            ...state,
            activeQuestion: action.payload.data
        }

        case EDIT_POST: return {
            ...state,
            activeQuestion: {...action.payload}
        }

        case DELETE_POST: return {
            
            activeQuestion: action.payload
        }

        default: return state;
    }
}