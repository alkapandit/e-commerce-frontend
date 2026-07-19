import { Outlet } from "react-router-dom"

import AppSidebar from "@/common/components/AppSidebar"

const AdminLayout = () => {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}

export default AdminLayout
