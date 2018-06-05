import axios from 'axios';

export const FETCH_ALL_CATEGORIES = 'fetchAllCategories';
export const FETCH_SINGLE_CATEGORY = 'fetchSingleCategory';


export const fetchAllCategories = () => (dispatch) => {
    axios.get(`http://localhost:62152/api/categories`)
   .then(response => dispatch({
    type: FETCH_ALL_CATEGORIES,
    payload: response.data
    
}))}

export const fetchSingleCategory = () => (dispatch) => {
    axios.get(`http://localhost:62152/api/questions/1/1`)
   .then(response => dispatch({
    type: FETCH_SINGLE_CATEGORY,
    payload: {
        currentCategory:response.data
    }
}))}