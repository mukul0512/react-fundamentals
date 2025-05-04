import Login from "./components/Login";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
