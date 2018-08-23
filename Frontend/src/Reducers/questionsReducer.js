import { QUESTIONS_ARE_LOADING, FETCH_QUESTIONS_SUCCESS } from '../Actions/questionActions'
const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {

        case QUESTIONS_ARE_LOADING: return action.isLoading;
        case FETCH_QUESTIONS_SUCCESS: return action.questions;

        default: return state;
    }
}