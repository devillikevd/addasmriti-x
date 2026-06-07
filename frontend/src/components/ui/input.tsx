import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; hint?: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-neutral-700 mb-1.5">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">{leftIcon}</div>}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-heritage-400 focus:border-heritage-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-400 focus:ring-red-400",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-neutral-400">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"
export { Input }
