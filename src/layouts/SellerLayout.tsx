import { Outlet } from "react-router-dom";

import AppSidebar from "@/common/components/AppSidebar";

const SellerLayout = () => {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  );
};

export default SellerLayout;
