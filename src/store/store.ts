import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { checkTokenExpirationMiddleware } from "./middlewares/middlewares";
import authReducer from "./auth/auth.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const middlewares = [thunkMiddleware, checkTokenExpirationMiddleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [...middlewares],
  enhancers: [composeWithDevTools(applyMiddleware(...middlewares))],
});
