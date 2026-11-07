import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/auth/pages/LoginPage";
import RegisterPage from "@/auth/pages/RegisterPage";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import UnauthorizedPage from "../common/components/UnauthorizedPage";
import NotFoundPage from "../common/components/NotFoundPage";
import Home from "@/modules/home/pages/Home";
import PrivateRoute from "@/routes/PrivateRoute";
import RoleRoute from "@/routes/RoleRoute";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/modules/admin/pages/DashboardPage";
import UsersPage from "@/modules/users/pages/UsersPage";

import ProductListPage from "@/modules/products/pages/ProductListPage";
import ProductDetailPage from "@/modules/products/pages/ProductDetailPage";
import CartPage from "@/modules/cart/pages/CartPage";
import WishlistPage from "@/modules/wishlist/pages/WishlistPage";
import AddressesPage from "@/modules/address/pages/AddressesPage";
import CheckoutPage from "@/modules/orders/pages/CheckoutPage";
import OrdersListPage from "@/modules/orders/pages/OrdersListPage";
import OrderDetailPage from "@/modules/orders/pages/OrderDetailPage";
import AccountPage from "@/modules/account/pages/AccountPage";

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
        element: <RegisterPage />,
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
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/cart", element: <CartPage /> },
          { path: "/wishlist", element: <WishlistPage /> },
          { path: "/addresses", element: <AddressesPage /> },
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/orders", element: <OrdersListPage /> },
          { path: "/orders/:id", element: <OrderDetailPage /> },
          { path: "/account", element: <AccountPage /> },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={["ADMIN"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/users", element: <UsersPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
