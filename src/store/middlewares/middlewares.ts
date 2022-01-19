import { Action, MiddlewareAPI } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import jwtDecode from "jwt-decode";

export const checkTokenExpirationMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      if ((jwtDecode(token) as { exp: number }).exp < Date.now() / 1000) {
        next(action);
        localStorage.clear();
      }
    }
    next(action);
  };
