import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-[#2b2d42] text-white shadow-sm hover:bg-[#2b2d42]/90 active:scale-[0.98] focus-visible:ring-[#2b2d42]",
    secondary: "bg-[#edf2f4] text-[#2b2d42] hover:bg-[#d8dce2] active:scale-[0.98]",
    outline: "border border-[rgba(43,45,66,0.15)] bg-transparent hover:bg-[#edf2f4] active:scale-[0.98]",
    ghost: "hover:bg-[#edf2f4] active:scale-[0.98]",
    destructive: "bg-[#ef4444] text-white hover:bg-[#ef4444]/90 active:scale-[0.98]",
    success: "bg-[#34C759] text-white hover:bg-[#34C759]/90 active:scale-[0.98]",
  },
  sizes: {
    default: "h-11 px-6 py-2.5",
    sm: "h-9 px-4 text-[14px]",
    lg: "h-12 px-8 text-[17px]",
    icon: "h-10 w-10",
  },
}

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
