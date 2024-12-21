import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import Login from "./Components/Login/Login";
import MasterLayout from "./Components/MasterLayout/MasterLayout";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Users from "./Components/Users/Users";
import AddUser from "./Components/AddUser/AddUser";
import Profile from "./Components/Profile/Profile";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "user",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "userList", element: <Users /> },
        { path: "addUser", element: <AddUser /> },
        { path: "addUser/:id", element: <AddUser /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
