import {FETCH_POSTS, NEW_POST} from './types'

export const fetchPost = () => dispatch => {
        
        fetch('http://localhost:62152/api/questions')
        .then(response => response.json())
         .then(json => dispatch({
             type: FETCH_POSTS,
             payload: json
         }))
    
}

export const createPost = (postData) => dispatch => {
        console.log(postData);
    fetch('https://jsonplaceholder.typicode.com/posts',{
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

}