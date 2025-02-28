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
import UpdateUserPage from "./pages/Users/update/updateUserPage";
import ProjectCreationPage from "./pages/Projects/create/create";
import ProjectsListPage from "./pages/Projects/list/list.projects";
import UpdateProjectPage from "./pages/Projects/update/updateProjectPage";
import ProductCreationPage from "./pages/Products/create/create";
import ProductsListPage from "./pages/Products/list/list.product";
import UpdateProductPage from "./pages/Products/update/updateProductPage";
import RolesListPage from "./pages/Roles/list/list.roles";
import ToDoRoleList from "./pages/Tasks/list/ToDoRoleList/todoRoleList";
import DoneByMyUserList from "./pages/Tasks/list/DoneUserList/DoneTasksByUser";

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
      {
        path: ROUTES_ENUM.USERS_UPDATE,
        element: <UpdateUserPage></UpdateUserPage>,
      },
      //
      //
      //
      //
      // PROJECT
      {
        path: ROUTES_ENUM.PROJECTS_CREATE,
        element: <ProjectCreationPage></ProjectCreationPage>,
      },
      {
        path: ROUTES_ENUM.PROJECTS_LIST,
        element: <ProjectsListPage></ProjectsListPage>,
      },
      {
        path: ROUTES_ENUM.PROJECTS_UPDATE,
        element: <UpdateProjectPage></UpdateProjectPage>,
      },
      //
      //
      //
      //
      // PRODUCT
      {
        path: ROUTES_ENUM.PRODUCT_CREATE,
        element: <ProductCreationPage></ProductCreationPage>,
      },
      {
        path: ROUTES_ENUM.PRODUCT_LIST,
        element: <ProductsListPage></ProductsListPage>,
      },
      {
        path: ROUTES_ENUM.PRODUCT_UPDATE,
        element: <UpdateProductPage></UpdateProductPage>,
      },
      //
      //
      //
      //
      // ROLE
      {
        path: ROUTES_ENUM.ROLE_LIST,
        element: <RolesListPage></RolesListPage>,
      },
      //
      //
      //
      //
      // TASK
      {
        path: ROUTES_ENUM.TASKS_TODO_ROLE_LIST,
        element: <ToDoRoleList></ToDoRoleList>,
      },
      {
        path: ROUTES_ENUM.TASKS_DONE_BY_ME_LIST,
        element: <DoneByMyUserList></DoneByMyUserList>,
      },
      //
      //
      //
      //
      // NOT FOUND
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
