import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteProfile = ({ redirectTo, isAllowed, children }) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRouteProfile;
