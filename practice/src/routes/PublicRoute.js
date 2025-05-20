import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  return !isAuthenticated ? children : <Navigate to="/home" />;
};

export default PublicRoute;