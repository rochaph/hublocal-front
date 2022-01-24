import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "Auth",
  initialState: { showMessage: false, error: false, message: "" },
  reducers: {
    successMessage(state, action) {
      state.showMessage = true;
      state.error = false;
      state.message = action.payload;
    },
    errorMessage(state, action) {
      state.showMessage = true;
      state.error = true;
      state.message = action.payload;
    },
    removeMessage(state) {
      state.showMessage = false;
      state.error = false;
      state.message = "";
    },
  },
});

export const { successMessage, errorMessage, removeMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
