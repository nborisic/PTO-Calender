export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const SCREEEN_SIZE = 'SCREEEN_SIZE';


function fetchUsersStart() {
  return {
    type: FETCH_USERS_START,
  };
}

function fetchUsersSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    data,
  };
}

function fetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
}

export function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersStart());
    fetch('https://private-ae838-ptoholiday.apiary-mock.com/users')
    .then((response) => {
      return response.json();
    })
      .then(data => dispatch(fetchUsersSuccess(data)))
      .catch(error => dispatch(fetchUsersError(error)));
  };
}


export function setBreakopint(screenSize) {
  return {
    type: SCREEEN_SIZE,
    screenSize,
  };
}
