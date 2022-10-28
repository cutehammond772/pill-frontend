import {
  ProfileReducingType,
  ProfileReducingFunction,
  ProfileReducingAction,
  INITIAL_STATE,
  ProfileState,
} from "./reducer.profile.type";

import { Reducer } from "redux";

// updating profile (if null, Guest Profile)
const updateProfile: ProfileReducingFunction = (profile) => ({
  type: ProfileReducingType.UPDATE,
  payload: {
    inited: true,
    profile: profile,
  },
});

// removing profile (to Guest Profile)
const removeProfile: ProfileReducingFunction = () => ({
  type: ProfileReducingType.REMOVE,
  payload: {
    inited: true,
  },
});

// initial state: Loading Profile
const profileReducer: Reducer<ProfileState, ProfileReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ProfileReducingType.UPDATE:
      return {
        profile: !action.payload.profile ? undefined : action.payload.profile,
        inited: action.payload.inited,
      };
    case ProfileReducingType.REMOVE:
      return {
        inited: action.payload.inited,
      };
    default:
      return state;
  }
};

export { updateProfile, removeProfile, profileReducer };
