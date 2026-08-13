import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-[12px] font-medium uppercase tracking-wider text-[#8d99ae]",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
