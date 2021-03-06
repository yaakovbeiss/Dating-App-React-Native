import merge from 'lodash/merge';

import {
  RECEIVE_PROFILE_IMAGES,
  RECEIVE_PROFILE_IMAGE_ERRORS
} from '../actions/profile_image_actions';

const defaultState = Object.freeze({
  profileImages: {},
  errors: []
});

export default ProfileImageReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch(action.type) {

    case RECEIVE_PROFILE_IMAGES:
      const profileImages = action.profileImages;

      return merge({}, state, {
        profileImages
      });
      break;

    case RECEIVE_PROFILE_IMAGE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {
        errors
      });
      break;

    default:
      return state;
  }
};
