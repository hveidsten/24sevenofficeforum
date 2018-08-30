import axios from 'axios';

export const USER_SIGN_IN = "USER_SIGN_IN";
export const USER_SIGN_OUT = "USER_SIGN_OUT";
export const FETCH_USER = "FETCH_USER";
export const EDIT_USER = "EDIT_USER";
export const FETCH_USERS = "FETCH_USERS";



const url = "http://localhost:62152/api/forumUsers/";

export const userSignIn = (id) => (dispatch) => {
  axios.get(url+id).then(
    response => {
      dispatch({
        type: USER_SIGN_IN,
        payload: response.data
      });
    }
  )
}

export const userSignOut = () => (dispatch) => {
      dispatch({
        type: USER_SIGN_OUT,
        payload: {userId:0}
      });
    }




export const fetchUser = (id) => (dispatch) => {
  axios.get(url+id).then(
    response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data
      });
    }
  )
}


export const fetchUsers = () => (dispatch) => {
  axios.get(url).then(
    response => {
      dispatch({
        type: FETCH_USERS,
        payload: response.data
      });
    }
  )
}

export const editUser = (data) => (dispatch) => {
  axios.put(url + data.id, data).then(
    response => {
      dispatch({
        type: EDIT_USER,
        payload: data
      });
    }
  )
}
