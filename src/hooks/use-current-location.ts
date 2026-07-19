import { useCallback, useEffect, useState } from "react"

type LocationState = {
  status: "idle" | "loading" | "success" | "error"
  locality: string | null
  error: string | null
}

const reverseGeocode = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  )

  if (!response.ok) {
    throw new Error("Failed to resolve address")
  }

  const data = await response.json()
  const address = data.address ?? {}

  return (
    address.suburb ||
    address.neighbourhood ||
    address.city_district ||
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    null
  )
}

export const useCurrentLocation = () => {
  const [state, setState] = useState<LocationState>({
    status: "idle",
    locality: null,
    error: null,
  })

  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        status: "error",
        locality: null,
        error: "Geolocation is not supported",
      })
      return
    }

    setState((prev) => ({ ...prev, status: "loading", error: null }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const locality = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          )
          setState({ status: "success", locality, error: null })
        } catch {
          setState({
            status: "error",
            locality: null,
            error: "Could not resolve your address",
          })
        }
      },
      () => {
        setState({
          status: "error",
          locality: null,
          error: "Location permission denied",
        })
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  useEffect(() => {
    detect()
  }, [detect])

  return { ...state, detect }
}
