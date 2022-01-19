import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { verifyAuthentication } from "../../store/auth/auth.slice";
import { useLocation, Navigate } from "react-router-dom";

function AuthComponent({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector((select) => select.auth.isLoggedIn);

  dispatch(verifyAuthentication);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthComponent;
