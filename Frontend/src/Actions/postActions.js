import {FETCH_POSTS, NEW_POST, FETCH_POST} from './types'
import axios from 'axios';

export const fetchPosts = (ApiPath) => (dispatch) => {
          axios.get(`http://localhost:62152/api/questions/${ApiPath}`)
         .then(response => dispatch({
        type: FETCH_POSTS,
        payload: response
    }))
 
}

export const fetchPost = (id) => (dispatch) => {
    axios.get(`http://localhost:62152/demo/${id}`)
    
   .then(response => dispatch({
  type: FETCH_POST,
  payload: response
}))
.catch(error => {
    console.log(error)
});

}

export const createPost = (postData) => dispatch => {

        console.log(postData);
    axios.post('http://localhost:62152/api/questions',postData)
    .then(data => dispatch({
        type:NEW_POST,
        payload: data
    }));

}

/*export const createPost = (postData) => dispatch => {
        console.log(postData);
    fetch('http://localhost:62152/api/questions',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => dispatch({
        type:NEW_POST,
        payload: data
    }));

}*/