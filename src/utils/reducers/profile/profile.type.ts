import { ProfileData } from "../../../components/profile/profile.type";

const ProfileReducingType = {
  UPDATE: "reducer.profile.update",
  REMOVE: "reducer.profile.remove",
} as const;

const INITIAL_STATE: ProfileData = {};

export { ProfileReducingType, INITIAL_STATE };
