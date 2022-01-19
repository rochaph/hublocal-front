import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("access_token");
const isLoggedIn =
  token !== null &&
  (jwtDecode(token) as { exp: number }).exp > Date.now() / 1000;

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLoggedIn,
    token: null,
  },
  reducers: {
    authenticate(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    removeAuthentication(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.clear();
    },
    verifyAuthentication(state) {
      const isValid =
        state.token !== null &&
        (jwtDecode(state.token) as { exp: number }).exp > Date.now() / 1000;

      state.isLoggedIn = isValid;
      state.token = isValid ? state.token : null;
    },
  },
});

export const { authenticate, removeAuthentication, verifyAuthentication } =
  authSlice.actions;

export default authSlice.reducer;
