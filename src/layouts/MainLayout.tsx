import { Outlet } from "react-router-dom"

import Header from "@/common/components/Header"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
