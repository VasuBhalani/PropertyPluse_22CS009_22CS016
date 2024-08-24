import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Layout from './pages/layout/Layout.jsx';
import Listpage from './pages/listPages/Listpages.jsx';
import LoginForm from './pages/auth/Login.jsx';
import Profile from './pages/profilePage/Profile';

import SignupForm from './pages/auth/Signup.jsx';

import Singlepage from './pages/singlePage/Singlepage.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <Listpage />,
        },
        {
          path: "/:id",
          element: <Singlepage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        }
      ]
    },
    // Routes outside of the layout (no navbar)
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <SignupForm />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
