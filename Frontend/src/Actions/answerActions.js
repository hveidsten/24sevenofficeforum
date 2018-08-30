import axios from 'axios';

export const FETCH_ANSWERS = "FETCH_ANSWERS";
export const CREATE_ANSWER = "CREATE_ANSWER";
export const EDIT_ANSWER = "EDIT_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";

export const fetchAnswers = (questionId, pageNumber, sortOrder) => (dispatch) => {
    axios.get(`http://localhost:62152/api/answers/?questionId=${questionId}&page=${pageNumber}&sortOrder=${sortOrder}`)
        .then(response => dispatch({
            type: FETCH_ANSWERS,
            payload: response.data
        }));
}

export const createAnswer = (postData, user) => (dispatch) => {
    const newAnswer = { ...postData, firstName: user.firstName, lastName: user.lastName, UserId: user.id };

    axios.post('http://localhost:62152/api/answers/', newAnswer)
        .then(response => dispatch({
            type: CREATE_ANSWER,
            payload: response.data,
            
            firstName: user.firstName,
            lastName: user.lastName

        }));
}

export const editAnswer = (post) => (dispatch) => {
    axios.patch('http://localhost:62152/api/answers/' + post.id,
        post)
        .then(response => dispatch({
            type: EDIT_ANSWER,
            payload: response.data
        }));
}

export const deleteAnswer = (id) => (dispatch) => {
    axios.delete('http://localhost:62152/api/answers/' + id)
        .then(response => {
            dispatch({
                type: DELETE_ANSWER,
                payload: id
            });
        });
}