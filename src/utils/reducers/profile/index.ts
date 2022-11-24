import { ProfileReducingType, INITIAL_STATE } from "./profile.type";

import { Reducer } from "redux";
import { ProfileData } from "../../../components/profile/profile.avatar";

// updating profile (if null, Guest Profile)
const updateProfile = (profile: ProfileData) => ({
  type: ProfileReducingType.UPDATE,
  payload: profile,
});

// removing profile (to Guest Profile)
const removeProfile = () => ({
  type: ProfileReducingType.REMOVE,
});

type ProfileReducingAction =
  | ReturnType<typeof updateProfile>
  | ReturnType<typeof removeProfile>;

// initial state: Loading Profile
const profileReducer: Reducer<ProfileData, ProfileReducingAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ProfileReducingType.UPDATE:
      return { ...action.payload };
    case ProfileReducingType.REMOVE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { updateProfile, removeProfile, profileReducer };
