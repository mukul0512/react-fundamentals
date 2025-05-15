import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./Authentication/AuthForm";
import Home from "./components/Home";
import { useEffect, useState } from "react";
/** Hello Mukul how are you */

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

const onLogout = () => {
  sessionStorage.clear()
}

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/home" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm type="login" />} />
        <Route path="/signup" element={<AuthForm type="signup" />} />
        <Route path="/home" element={<PrivateRoute element={<Home onLogout={onLogout} />} />} />
      </Routes>
    </Router>
  );
};

export default App;