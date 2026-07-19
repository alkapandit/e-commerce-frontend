import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/auth/pages/LoginPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardPage } from "@/modules/admin/pages/DashboardPage";
import { UsersPage } from "@/modules/users/pages/UsersPage";
import UnauthorizedPage from "../auth/pages/UnauthorizedPage";
import NotFoundPage from "../common/components/NotFoundPage";
import Home from "@/modules/home/pages/Home";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
