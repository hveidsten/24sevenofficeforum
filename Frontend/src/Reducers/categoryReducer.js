import {FETCH_ALL_CATEGORIES} from '../Actions/categoryActions';
import {FETCH_SINGLE_CATEGORY} from '../Actions/categoryActions';

const categoryReducer = (state={},action) => {
    switch(action.type){
        
        case FETCH_ALL_CATEGORIES: 
        return {...state, allCategories: action.payload};

        case FETCH_SINGLE_CATEGORY: 
        return  {...state, currentCategory: action.payload};

        default: return state;
    }
}

export default categoryReducer;