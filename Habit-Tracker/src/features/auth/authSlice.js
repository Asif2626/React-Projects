import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle", // idle | loading | authenticated
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "idle";
    },
    logout(state) {
      state.user = null;
      state.status = "idle";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
