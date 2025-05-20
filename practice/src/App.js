import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/signup/AuthForm";
import Home from "./pages/home";
import { PrivateRoute, PublicRoute } from "./routes";
/** Hello Mukul how are you */

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
