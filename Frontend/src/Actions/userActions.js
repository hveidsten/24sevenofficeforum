export const USER_LOGGEDIN = " USER_LOGGEDIN";

export const userIsLoggedIn =  (a) => (dispatch) => {
 dispatch({
  type: USER_LOGGEDIN,
  payload: {
    isLoggedIn: a===1?true:false,
    userName: "Brukernavn"
  }
})
}