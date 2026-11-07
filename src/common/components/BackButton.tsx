import { ArrowLeft } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

/**
 * Goes back in browser history when there's somewhere in-app to go back
 * to, otherwise falls back to a fixed route -- so a page opened directly
 * from a bookmark/shared link (no history) doesn't send the user out of
 * the app entirely.
 */
const BackButton = ({
  fallbackTo = "/",
  label = "Back",
  className,
}: {
  fallbackTo?: string
  label?: string
  className?: string
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    // react-router gives the very first entry in a session the key
    // "default" -- there's nothing of ours before it to go back to.
    if (location.key !== "default") {
      navigate(-1)
    } else {
      navigate(fallbackTo)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`-ml-2 gap-1.5 text-slate-600 hover:text-slate-900 ${className ?? ""}`}
    >
      <ArrowLeft className="size-4" />
      {label}
    </Button>
  )
}

export default BackButton
