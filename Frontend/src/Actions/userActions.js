export const USER_LOGGEDIN = " USER_LOGGEDIN";


const dummyUsers = [{ id: "1", userName: "Testuser A" }, { id: "2", userName: "Testuser B" }];

export const userIsLoggedIn = (a) => (dispatch) => {
  dispatch({
    type: USER_LOGGEDIN,
    payload: {
      isLoggedIn: a === 1 ? true : false,
      userName: " Testbruker"
    }
  });
}