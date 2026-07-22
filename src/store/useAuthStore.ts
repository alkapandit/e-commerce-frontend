import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AuthUser } from "@/auth/types/auth.types"

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  setUser: (user: AuthUser) => void
  clearUser: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
)

export default useAuthStore
