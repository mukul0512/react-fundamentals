import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import Home from "./components/Home";

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

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Login />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
