import type { ReactNode } from "react"

import { Header } from "@/common/components/Header"

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export { MainLayout }
