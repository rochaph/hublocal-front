import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const token = Cookies.get("access_token");
const isLoggedIn =
  token && (jwtDecode(token) as { exp: number }).exp > Date.now() / 1000;

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLoggedIn,
    token: token,
  },
  reducers: {
    authenticate(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      Cookies.set("access_token", action.payload, {
        sameSite: "strict",
      });
    },
    removeAuthentication(state) {
      state.isLoggedIn = false;
      state.token = undefined;
      Cookies.remove("access_token", {
        sameSite: "strict",
      });
    },
  },
});

export const { authenticate, removeAuthentication } = authSlice.actions;

export default authSlice.reducer;
