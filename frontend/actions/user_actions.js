import * as APIUtil from '../util/user_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});


export const requestUser = id => dispatch => (
  APIUtil.fetchUser(id).then( res => (
      dispatch(receiveCurrentUser(res.data))
    ), err => (
      dispatch(receiveSessionErrors(err.response.data))
    )
  )
);

export const requestUsers = () => dispatch => (
  APIUtil.fetchUsers().then( res => (
      dispatch(receiveUsers(res.data))
    ), err => (
      dispatch(receiveSessionErrors(err.response.data))
    )
  )
);
