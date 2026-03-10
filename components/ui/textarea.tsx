import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:border-[#14b8a6] focus-visible:bg-white/[0.06] focus-visible:ring-[3px] focus-visible:ring-[#14b8a6]/10 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
