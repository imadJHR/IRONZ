// components/ui/skeleton.tsx
import { cn } from "../../lib/utils"
import React from "react"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  inline?: boolean;
}

function Skeleton({ className, inline = false, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse rounded-md",
        inline ? "inline-block align-middle" : "block",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }