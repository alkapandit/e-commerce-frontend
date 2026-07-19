import type { ComponentProps } from "react"
import { useField } from "formik"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TextFieldProps = Omit<ComponentProps<typeof Input>, "name"> & {
  name: string
  label?: string
  boxed?: boolean
  wrapperClassName?: string
}

const TextField = ({
  name,
  label,
  boxed = false,
  id,
  className,
  wrapperClassName,
  ...props
}: TextFieldProps) => {
  const [field, meta] = useField(name)
  const inputId = id ?? name
  const hasError = meta.touched && !!meta.error

  if (boxed) {
    return (
      <div className={cn("flex flex-col gap-1", wrapperClassName)}>
        <div
          className={cn(
            "rounded-md border-2",
            hasError ? "border-destructive" : "border-blue-500"
          )}
        >
          {label && (
            <Label
              htmlFor={inputId}
              className="block px-3 pt-2 text-xs font-medium text-slate-700"
            >
              {label}
            </Label>
          )}
          <Input
            id={inputId}
            aria-invalid={hasError}
            className={cn(
              "h-auto rounded-none border-0 bg-slate-50 px-3 pb-2 text-sm shadow-none focus-visible:ring-0",
              className
            )}
            {...field}
            {...props}
          />
        </div>
        {hasError && <p className="text-xs text-destructive">{meta.error}</p>}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input
        id={inputId}
        aria-invalid={hasError}
        className={className}
        {...field}
        {...props}
      />
      {hasError && <p className="text-xs text-destructive">{meta.error}</p>}
    </div>
  )
}

export default TextField
