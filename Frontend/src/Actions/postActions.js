import {FETCH_POSTS, NEW_POST, FETCH_POST, EDIT_POST} from './types'
import axios from 'axios';

export const fetchPosts = (ApiPath) => (dispatch) => {
          axios.get(`http://localhost:62152/api/${ApiPath}`)
         .then(response => dispatch({
        type: FETCH_POSTS,
        payload: response
    }))
 
}

export const fetchPost = (id) => (dispatch) => {
   console.log("fetch id: "+id);
    axios.get(`http://localhost:62152/demo/${id}`)
    
   .then(response => dispatch({
  type: FETCH_POST,
  payload: response.data
}))
.catch(error => {
    console.log(error)
});

}

export const createPost = (postData) => (dispatch) => {

        
    axios.post('http://localhost:62152/api/questions',postData)
    .then(response => dispatch({
        type:NEW_POST,
        payload: response
    }));

}

export const editPost = (postData) => (dispatch) => {

axios.put('http://localhost:62152/demo/'+postData.id,postData);
dispatch({
    type:EDIT_POST,
    payload: postData
});
}

export const deletePost = (id, match) => (dispatch) => {
console.log(match);
    axios.delete('http://localhost:62152/api/questions/'+id);
  
 }
    