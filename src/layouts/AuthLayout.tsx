import { Link, Outlet } from "react-router-dom"
import { X } from "lucide-react"

const AuthLayout = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <Link
          to="/"
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 transition-colors hover:text-slate-600"
        >
          <X className="size-5" />
        </Link>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
