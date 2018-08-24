import axios from 'axios';

export const FETCH_ANSWERS = "FETCH_ANSWERS";

export const fetchAnswers = (questionId, pageNumber, sortOrder) => (dispatch) => {
    console.log(`?questionId=${questionId}&page=${pageNumber}&sortOrder=${sortOrder}`);
    
    axios.get(`http://localhost:62152/api/answers/?questionId=${questionId}&page=${pageNumber}&sortOrder=${sortOrder}`)
        .then(response => dispatch({
            type: FETCH_ANSWERS,
            payload: response.data
        }));
}
