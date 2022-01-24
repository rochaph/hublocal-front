import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { removeAuthentication } from "../../store/auth/auth.slice";
import Cookies from "js-cookie";
import { useAppSelector } from "../../store/hooks";

function AuthComponent({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const cookie_token = Cookies.get("access_token");
  const isAuthenticated =
    cookie_token &&
    token &&
    (jwtDecode(token) as { exp: number }).exp > Date.now() / 1000;

  if (!isAuthenticated) {
    dispatch(removeAuthentication());

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthComponent;
