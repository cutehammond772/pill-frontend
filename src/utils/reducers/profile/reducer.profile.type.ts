import { ProfileData } from "../../../components/profile/profile.type";

const ProfileReducingType = {
  UPDATE: "reducer.profile.update",
  REMOVE: "reducer.profile.remove",
} as const;

const INITIAL_STATE: ProfileState = {
  inited: false
};

type ProfileReducing =
  typeof ProfileReducingType[keyof typeof ProfileReducingType];

interface ProfileReducingFunction {
  (profile?: ProfileData): ProfileReducingAction;
}

interface ProfileState {
  profile?: ProfileData;
  inited: boolean;
}

interface ProfileReducingAction {
  type: ProfileReducing;
  payload: ProfileState;
}

export type { ProfileReducingFunction, ProfileReducingAction, ProfileState };
export { ProfileReducingType, INITIAL_STATE };
