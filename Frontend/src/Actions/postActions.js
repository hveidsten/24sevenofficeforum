
import axios from 'axios';

export const FETCH_POSTS = "FETCH_POSTS";
export const NEW_POST = "NEW_POST";
export const FETCH_POST = "FETCH_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const NEW_ANSWER = "NEW_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";


export const fetchPosts = (ApiPath) => (dispatch) => {
          axios.get(`http://localhost:62152/api/${ApiPath}`)
         .then(response => dispatch({
        type: FETCH_POSTS,
        payload: response.data
    }))
 
}

export const fetchPost = (id) => { return (dispatch) => {
return(
    axios.get(`http://localhost:62152/demo/${id}`)
   .then(response => dispatch({
  type: FETCH_POST,
  payload: response.data
})));

}
}

export const createPost = (postData,postUrl) => (dispatch) => {

    axios.post('http://localhost:62152/api/'+postUrl,postData)
    .then(response => dispatch({
        type:NEW_POST,
        payload: response.data
    })
    
    );
}

export const createAnswer = (postData,postUrl) => (dispatch) => {

    axios.post('http://localhost:62152/api/'+postUrl,postData)
    .then(response => dispatch({
        type:NEW_ANSWER,
        payload: response.data
    }));
}

export const editPost = (postData) => (dispatch) => {

axios.put('http://localhost:62152/demo/'+postData.id,postData);
dispatch({
    type:EDIT_POST,
    payload: postData
});
}

export const deletePost = (id) => (dispatch) => {

    axios.delete('http://localhost:62152/api/questions/'+id)
    .then(response => {
        dispatch({
            type:DELETE_POST,
            payload: id
        });
    });
 }
 
 export const deleteAnswer = (id) => (dispatch) => {

    axios.delete('http://localhost:62152/api/answers/'+id)
    .then(response => {
        dispatch({
            type:DELETE_ANSWER,
            payload: id
        });
    });
 }
