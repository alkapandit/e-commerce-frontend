import { Outlet } from "react-router-dom"

import Header from "@/common/components/Header"
import Footer from "@/common/components/Footer"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
