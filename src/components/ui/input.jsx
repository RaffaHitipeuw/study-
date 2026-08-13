import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[rgba(43,45,66,0.12)] bg-[#edf2f4]/50 px-4 text-[15px] text-[#2b2d42]",
        "placeholder:text-[#8d99ae]",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-[#2b2d42]/20 focus:border-[#2b2d42] focus:bg-white",
        "active:scale-[0.99]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
