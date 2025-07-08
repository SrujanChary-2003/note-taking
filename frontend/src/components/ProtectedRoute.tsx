import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = localStorage.getItem("user"); // or check for token/cookie

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
