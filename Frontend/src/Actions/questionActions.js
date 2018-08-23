import axios from 'axios';

export const QUESTIONS_ARE_LOADING = "QUESTIONS_ARE_LOADING";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";

export const questionsAreLoading = (isLoading) => ({
    type: QUESTIONS_ARE_LOADING,
    isLoading: isLoading
});

export const fetchQuestionsSuccess = (questions) => ({
    type: FETCH_QUESTIONS_SUCCESS,
    questions
});


export const fetchQuestions = (url) => (dispatch) => {
    dispatch(questionsAreLoading(true));

    axios.get(`http://localhost:62152/api/${url}`)
    .then((response) => {
        dispatch(questionsAreLoading(false));
        return response.data;
    })
    .then(questions => dispatch(fetchQuestionsSuccess(questions)));
}