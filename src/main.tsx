import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SwitchesList from "./pages/Switches/SwitchesListPage/SwitchesListPage";
import { ROUTES_ENUM } from "./shared/enums/routes.enum";
import CreateSwitchPage from "./pages/Switches/CreateSwitch/CreateSwitchPage";
import "./index.css";
import CommandOnSwitchPage from "./pages/Switches/CommandOnSwitch/CommandOnSwitchPage";
import UpdateSwitchPage from "./pages/Switches/UpdateSwitch/UpdateSwitchPage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import SwitchesHardeningPage from "./pages/Switches/Hardening/DetailHardeningPage";
import HardeningChartsPage from "./pages/Switches/Hardening/HardeningChartsPage";
import HardeningPrePage from "./pages/Switches/Hardening/HardeningPrePages";
import CISCreationPage from "./pages/CIS/CIS/Create/Create";
import UpdateCISPage from "./pages/CIS/CIS/Update/UpdateCISPage";
import CategoryCreationPage from "./pages/CIS/Category/Create/Create";
import CategoryListPage from "./pages/CIS/Category/List/categoryListPage";
import CISListPage from "./pages/CIS/CIS/List/CISListPage";
import UpdateCategoryPage from "./pages/CIS/Category/Update/UpdateCategory";
import CreateHardeningPage from "./pages/CIS/Hardening/Create/Create";
import HardeningListPage from "./pages/CIS/Hardening/List/hardeningListPage";
import UpdateHardeningPage from "./pages/CIS/Hardening/Update/UpdateHardeningPage";
import OSListPage from "./pages/OperatingSystem/List/List";
import HardeningSummaryDetailPage from "./pages/Switches/Hardening/HardeningSummaryWithDetailsPage";
import BaseLayout from "./components/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/", // Base path
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
      // SWITCHES
      {
        path: ROUTES_ENUM.SWITCHES_LIST,
        element: <SwitchesList />,
      },
      { path: ROUTES_ENUM.SWITCHES_CREATE, element: <CreateSwitchPage /> }, // Nested route
      {
        path: ROUTES_ENUM.SWITCHES_TERMINAL,
        element: <CommandOnSwitchPage />,
      },
      {
        path: ROUTES_ENUM.SWITCHES_UPDATE,
        element: <UpdateSwitchPage />,
      },
      {
        path: ROUTES_ENUM.SWITCHES_DETAIL_HARDENING,
        element: <SwitchesHardeningPage />,
      },
      {
        path: ROUTES_ENUM.SWITCHES_CHARTS_HARDENING,
        element: <HardeningChartsPage />,
      },
      {
        path: ROUTES_ENUM.SWITCHES_PREPAGES_HARDENING,
        element: <HardeningPrePage />,
      },
      {
        path: ROUTES_ENUM.SWITCHES_REPORT_HARDENING_SUMMARYDETAIL,
        element: <HardeningSummaryDetailPage />,
      },

      //
      //
      //
      //
      // CIS
      {
        path: ROUTES_ENUM.CIS_CREATE,
        element: <CISCreationPage />,
      },
      {
        path: ROUTES_ENUM.CIS_LIST,
        element: <CISListPage />,
      },
      {
        path: ROUTES_ENUM.CIS_UPDATE,
        element: <UpdateCISPage />,
      },
      //
      //
      //
      //
      // CATEGORY
      {
        path: ROUTES_ENUM.CATEGORY_CREATE,
        element: <CategoryCreationPage />,
      },
      {
        path: ROUTES_ENUM.CATEGORY_LIST,
        element: <CategoryListPage />,
      },
      {
        path: ROUTES_ENUM.CATEGORY_UPDATE,
        element: <UpdateCategoryPage />,
      },
      //
      //
      //
      //
      // HARDENING
      {
        path: ROUTES_ENUM.HARDENING_LIST,
        element: <HardeningListPage />,
      },
      {
        path: ROUTES_ENUM.HARDENING_CREATE,
        element: <CreateHardeningPage />,
      },
      {
        path: ROUTES_ENUM.HARDENING_UPDATE,
        element: <UpdateHardeningPage />,
      },
      //
      //
      //
      //
      // OPERATING SYSTEM
      {
        path: ROUTES_ENUM.OS_LIST,
        element: <OSListPage />,
      },
      // {
      //   path: ROUTES_ENUM.OS_CREATE,
      //   element: <OSCreationPage />,
      // },
      // {
      //   path: ROUTES_ENUM.OS_UPDATE,
      //   element: <OSUpdatePage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
