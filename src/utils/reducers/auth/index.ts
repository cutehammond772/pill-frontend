import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loaded: boolean;
  authorized?: boolean;
  refreshDate?: number;
}

const REDUCER_NAME = "auth";
const initialState: AuthState = {
  loaded: false,
};

const authSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    authorize: (
      state,
      action: PayloadAction<{ authorized: boolean, refreshDate?: number }>
    ) => {
      state.loaded = true;
      state.authorized = action.payload.authorized;
      state.refreshDate = action.payload.refreshDate;
    },
    logout: () => initialState,
  },
});

export const { authorize, logout } = authSlice.actions;
export { REDUCER_NAME, type AuthState };
export default authSlice.reducer;
