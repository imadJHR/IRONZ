"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export const Marquee = ({ children, direction = "left", speed = 50, pauseOnHover = true, className }) => {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = React.useState(false)

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return

    const scrollerContent = Array.from(scrollerRef.current.children)

    // If not enough content to scroll, duplicate items
    if (scrollerContent.length <= 1) {
      const duplicate = scrollerContent.map((item) => item.cloneNode(true))
      duplicate.forEach((item) => {
        scrollerRef.current.appendChild(item)
      })
    }

    setStart(true)

    return () => setStart(false)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          start && pauseOnHover && "hover:[animation-play-state:paused]",
          direction === "right" && "flex-row-reverse",
          direction === "right" && start && "animate-scroll-reverse",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll",
          start && pauseOnHover && "hover:[animation-play-state:paused]",
          direction === "right" && "flex-row-reverse",
          direction === "right" && start && "animate-scroll-reverse",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

export const MarqueeItem = ({ className, children }) => {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>
}

