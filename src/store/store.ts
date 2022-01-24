import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/auth.slice";
import messageReducer from "./message/message.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const middlewares = [thunkMiddleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
  middleware: [...middlewares],
  enhancers: [composeWithDevTools(applyMiddleware(...middlewares))],
});
