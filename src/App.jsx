import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import {Layout, RequireAuth} from './pages/layout/Layout.jsx';
import Listpage from './pages/listPages/Listpages.jsx';
import LoginForm from './pages/auth/Login.jsx';
import Profile from './pages/profilePage/Profile';
import SignupForm from './pages/auth/Signup.jsx';
import Singlepage from './pages/singlePage/Singlepage.jsx';
import UpdateProfile from './pages/profileUpdate/Updateprofile.jsx';
import NewPostPage from './pages/createPost/CreatePost.jsx';
import { singlePageLoader, listPageLoader, profilePageLoader } from "./lib/loader.js";
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
          loader : listPageLoader,
        },
        {
          path: "/:id",
          element: <Singlepage />,
          loader: singlePageLoader,
        },
        
        {
          path: "/login",
          element: <LoginForm />,
        },
        {
          path: "/register",
          element: <SignupForm />,
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth />,

      children:[
        {
          path: "/profile",
          element: <Profile />,
          loader :profilePageLoader
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
        {
          path: "/createPost",
          element: <NewPostPage />,
        },
      ]
    }
    // Routes outside of the layout (no navbar)
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
