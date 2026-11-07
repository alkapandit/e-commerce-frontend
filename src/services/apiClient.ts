import axios from "axios"

import useAuthStore from "@/store/useAuthStore"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Auth works entirely via httpOnly cookies (accessToken / refreshToken) set
// by the backend on login -- there's nothing to attach from JS here, and
// nothing worth duplicating into localStorage (keeping the raw token out of
// JS-readable storage is the whole point of httpOnly cookies).

let isRefreshing = false
let pendingRequests: Array<() => void> = []

const onRefreshed = () => {
  pendingRequests.forEach((resolve) => resolve())
  pendingRequests = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    const status = response?.status
    const url: string = config?.url ?? ""

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refreshToken")

    // Only ever attempt one silent refresh per request, and never for the
    // auth endpoints themselves (a 401 there is a real login/refresh
    // failure, not an expired session to recover from).
    if (status !== 401 || isAuthRoute || !config || config._retry) {
      return Promise.reject(error)
    }

    config._retry = true

    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push(() => resolve(apiClient(config)))
      })
    }

    isRefreshing = true

    try {
      await apiClient.post("/auth/refreshToken")
      isRefreshing = false
      onRefreshed()
      return apiClient(config)
    } catch (refreshError) {
      isRefreshing = false
      pendingRequests = []

      // The refresh token is dead too -- the session is really over.
      useAuthStore.getState().clearUser()
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.assign("/login")
      }

      return Promise.reject(refreshError)
    }
  }
)

export default apiClient
