import { ProfileData } from "../../../components/profile/profile.type";

const ProfileReducingType = {
  UPDATE: "reducer.profile.UPDATE",
  REMOVE: "reducer.profile.REMOVE",
} as const;

const INITIAL_STATE: ProfileData = {};

export { ProfileReducingType, INITIAL_STATE };
