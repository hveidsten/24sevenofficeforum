import {FETCH_POSTS, NEW_POST, FETCH_POST, EDIT_POST,NEW_ANSWER,DELETE_POST} from './types'
import axios from 'axios';

export const fetchPosts = (ApiPath) => (dispatch) => {
          axios.get(`http://localhost:62152/api/${ApiPath}`)
         .then(response => dispatch({
        type: FETCH_POSTS,
        payload: response.data
    }))
 
}

export const fetchPost = (id) => (dispatch) => {
    axios.get(`http://localhost:62152/demo/${id}`)
   .then(response => dispatch({
  type: FETCH_POST,
  payload: response.data
}))
.catch(error => {
    console.log(error)
});

}

export const createPost = (postData,postUrl) => (dispatch) => {

    axios.post('http://localhost:62152/api/'+postUrl,postData)
    .then(response => dispatch({
        type:NEW_POST,
        payload: response.data
    }));
    return Promise.resolve;
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
    