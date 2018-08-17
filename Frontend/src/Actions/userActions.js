export const USER_LOGGEDIN = "USER_LOGGEDIN";
export const FETCH_USER = "FETCH_USER";


export const userIsLoggedIn = (a) => (dispatch) => {
  dispatch({
    type: USER_LOGGEDIN,
    payload: {
      isLoggedIn: a === 1 ? true : false,
      userId: a === 1? 1:0,
      userName:  a === 1? "Testuser": ""
    }
  });
}

export const fetchUser = (id) => (dispatch) => {
  console.log(id);
  dispatch({
    type: FETCH_USER,
    payload: dummyUsers[id]
  });
}


const dummyUsers = [{
  "userId": 1,
  "firstName": "Bethena",
  "lastName": "Aleksandrov",
  "email": "baleksandrov0@who.int",
  "userName": "baleksandrov0",
  "phone": "9059118619"
}, {
  "userId": 2,
  "firstName": "Rolando",
  "lastName": "Schankel",
  "email": "rschankel1@addtoany.com",
  "userName": "rschankel1",
  "phone": "9367675146"
}, {
  "userId": 3,
  "firstName": "Jakie",
  "lastName": "Terney",
  "email": "jterney2@mayoclinic.com",
  "userName": "jterney2",
  "phone": "2784563366"
}, {
  "userId": 4,
  "firstName": "Alix",
  "lastName": "Percifer",
  "email": "apercifer3@sakura.ne.jp",
  "userName": "apercifer3",
  "phone": "1882473019"
}, {
  "userId": 5,
  "firstName": "Lesley",
  "lastName": "Methingam",
  "email": "lmethingam4@theglobeandmail.com",
  "userName": "lmethingam4",
  "phone": "7737521704"
}, {
  "userId": 6,
  "firstName": "Faulkner",
  "lastName": "Hampshire",
  "email": "fhampshire5@mysql.com",
  "userName": "fhampshire5",
  "phone": "2437806769"
}, {
  "userId": 7,
  "firstName": "Lesly",
  "lastName": "Dearing",
  "email": "ldearing6@auda.org.au",
  "userName": "ldearing6",
  "phone": "1589131874"
}, {
  "userId": 8,
  "firstName": "Gasparo",
  "lastName": "Matteoni",
  "email": "gmatteoni7@ucoz.ru",
  "userName": "gmatteoni7",
  "phone": "1657433705"
}, {
  "userId": 9,
  "firstName": "Avram",
  "lastName": "Flanagan",
  "email": "aflanagan8@thetimes.co.uk",
  "userName": "aflanagan8",
  "phone": "3603252434"
}, {
  "userId": 10,
  "firstName": "Ginger",
  "lastName": "Douthwaite",
  "email": "gdouthwaite9@forbes.com",
  "userName": "gdouthwaite9",
  "phone": "8779241232"
}];