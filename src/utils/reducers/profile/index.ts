import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  userName?: string;
  profileUrl?: string;
}

const REDUCER_NAME = "profile";
const initialState: ProfileState = {};

const profileSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setToUser: (
      _,
      action: PayloadAction<{
        userName: string;
        profileUrl: string;
      }>
    ) => action.payload,

    setToAnonymous: () => initialState,
  },
});

export const { setToUser, setToAnonymous } = profileSlice.actions;
export { REDUCER_NAME, type ProfileState };
export default profileSlice.reducer;
