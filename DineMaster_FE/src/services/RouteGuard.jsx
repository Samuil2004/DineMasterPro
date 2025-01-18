import { Navigate } from "react-router-dom";
import { getClaims } from "./TokenManager";
import ErrorPage from "../components/ErrorPage";

const RouteGuard = ({ children, allowedRoles }) => {
  //children are all components that are wrapped by this guard
  const claims = getClaims();
  if (!claims) {
    return <Navigate to="/login" />;
  }

  if (!claims.roles.some((role) => allowedRoles.includes(role))) {
    return <ErrorPage />;
  }
  return children;
};

export default RouteGuard;
