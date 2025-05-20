import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("authToken");
    console.log("is authenticated :", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;