import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

const nullUser = Object.freeze({
  currentUser: null,
  errors: []
});

const SessionReducer = (state = nullUser, action) => {
  Object.freeze(state)
  switch(action.type) {

    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, {
        currentUser
      });
      break;

    case RECEIVE_SESSION_ERRORS:
      const errors = action.errors;
      return merge({}, state, {
        errors
      });
      break;

    default:
      return state;
  }
};

export default SessionReducer;
