import type { ComponentProps } from "react"
import { useState } from "react"
import { useField } from "formik"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PasswordFieldProps = Omit<ComponentProps<typeof Input>, "name" | "type"> & {
  name: string
  label?: string
  wrapperClassName?: string
}

const PasswordField = ({
  name,
  label = "Password",
  id,
  className,
  wrapperClassName,
  ...props
}: PasswordFieldProps) => {
  const [field, meta] = useField(name)
  const [visible, setVisible] = useState(false)
  const inputId = id ?? name
  const hasError = meta.touched && !!meta.error

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="relative">
        <Input
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={hasError}
          className={cn("h-10 pr-10", className)}
          {...field}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {hasError && <p className="text-xs text-destructive">{meta.error}</p>}
    </div>
  )
}

export default PasswordField
