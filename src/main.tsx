import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { ROUTES_ENUM } from "./shared/enums/routes.enum";
import "./index.css";
import LoginPage from "./pages/Auth/Login/LoginPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import BaseLayout from "./components/BaseLayout";
import UsersListPage from "./pages/Users/list/list.users";
import UserCreationPage from "./pages/Users/create/create";

const router = createBrowserRouter([
  {
    path: ROUTES_ENUM.HOME, // Base path
    element: <BaseLayout />, // Wrap with BaseLayout
    children: [
      {
        path: ROUTES_ENUM.HOME,
        element: <HomePage></HomePage>,
      },
      //
      //
      //
      //
      // AUTH
      {
        path: ROUTES_ENUM.LOGIN,
        element: <LoginPage></LoginPage>,
      },
      {
        path: ROUTES_ENUM.REGISTER,
        element: <RegisterPage />,
      },
      //
      //
      //
      //
      // USER
      {
        path: ROUTES_ENUM.USERS_LIST,
        element: <UsersListPage></UsersListPage>,
      },
      {
        path: ROUTES_ENUM.USERS_CREATE,
        element: <UserCreationPage></UserCreationPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
