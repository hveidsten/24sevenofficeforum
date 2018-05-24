import {FETCH_POSTS,FETCH_POST, NEW_POST, EDIT_POST, DELETE_POST} from '../Actions/types'

const initialState = {
    
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_POSTS: 
        return {
            ...state,
            items: action.payload
        }

        case FETCH_POST: 
        return {
            ...state,
            item: action.payload
        }
        
        case NEW_POST: return {
            ...state,
            item: action.payload.data
        }

        case EDIT_POST: return {
            
            item: action.payload
        }

        case DELETE_POST: return {
            
            item: action.payload
        }

        default: return state;
    }
}