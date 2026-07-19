import { Outlet } from "react-router-dom";

import AppSidebar from "@/common/components/AppSidebar";

const UserLayout = () => {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  );
};

export default UserLayout;
