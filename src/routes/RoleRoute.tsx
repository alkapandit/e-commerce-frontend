import { Navigate, Outlet } from "react-router-dom"

import useAuthStore from "@/store/useAuthStore"

/**
 * Gate for routes limited to specific roles (e.g. seller/admin sections).
 * Assumes PrivateRoute already confirmed the user is logged in -- this only
 * checks *which* role they have, redirecting to /unauthorized otherwise.
 */
const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = useAuthStore((state) => state.user?.role)

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RoleRoute
