import axios from 'axios';

export const QUESTIONS_ARE_LOADED = "QUESTIONS_ARE_LOADED";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";

export const questionsAreLoaded = (isLoaded) => ({
    type: QUESTIONS_ARE_LOADED,
    isLoaded: isLoaded
});

export const fetchQuestionsSuccess = (questions) => ({
    type: FETCH_QUESTIONS_SUCCESS,
    questions
});

export const fetchQuestions = (categoryId,pageNumber, sortOrder) => (dispatch) => {
    console.log(categoryId,pageNumber);
    dispatch(questionsAreLoaded(false));

    axios.get(`http://localhost:62152/api/questions/?categoryId=${categoryId}&page=${pageNumber}&sortOrder=${sortOrder}`)
    .then((response) => {
        dispatch(questionsAreLoaded(true));
        return response.data;
    })
    .then(questions => dispatch(fetchQuestionsSuccess(questions)));
}