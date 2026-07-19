import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}

export { AuthLayout }
