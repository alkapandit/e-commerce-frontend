import { Navigate, Outlet, useLocation } from "react-router-dom"

import useAuthStore from "@/store/useAuthStore"

/**
 * Gate for any route that requires a logged-in user. Unauthenticated
 * visitors are bounced to /login, carrying the page they wanted so the
 * login flow can send them back afterwards.
 */
const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default PrivateRoute
