import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import AuthForm from "./Authentication/AuthForm";
import Home from "./components/Home";
/** Hello Mukul how are you */

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem("authToken");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return isAuthenticated;
// };

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  console.log("is authenticated :", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};
const PublicRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  return !isAuthenticated ? children : <Navigate to="/home" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthForm type="login" />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <AuthForm type="signup" />
            </PublicRoute>
          }
        />
        <Route path="/home" element={<PrivateRoute children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
