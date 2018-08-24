import axios from 'axios';

export const QUESTIONS_ARE_LOADED = "QUESTIONS_ARE_LOADED";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const NEW_QUESTION = "NEW_QUESTION";
export const FETCH_QUESTION ="FETCH_QUESTION";

export const questionsAreLoaded = (isLoaded) => ({
    type: QUESTIONS_ARE_LOADED,
    isLoaded: isLoaded
});

export const fetchQuestionsSuccess = (questions) => ({
    type: FETCH_QUESTIONS_SUCCESS,
    questions
});

export const fetchQuestions = (categoryId, pageNumber, sortOrder) => (dispatch) => {
    dispatch(questionsAreLoaded(false));
    const url = `http://localhost:62152/api/questions/?categoryId=${categoryId}&page=${pageNumber}&sortOrder=${sortOrder}`;

    axios.get(url)
        .then((response) => {
            dispatch(questionsAreLoaded(true));
            return response.data;
        })
        .then(questions => dispatch(fetchQuestionsSuccess(questions)));
}

export const createQuestion = (postData) => (dispatch) => {

    axios.post('http://localhost:62152/api/questions', postData)
        .then(response => dispatch({
            type: NEW_QUESTION,
            payload: response.data
        }));
}

export const fetchQuestion = (id) => (dispatch) => {
    return(
    axios.get(`http://localhost:62152/api/questions/${id}`)
        .then(response => dispatch({
            type: FETCH_QUESTION,
            payload: response.data
        }))
    );
}