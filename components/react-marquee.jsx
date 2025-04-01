"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

export const Marquee = ({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
  ...props
}) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      setContainerWidth(containerRect.width)
      setContentWidth(contentRect.width)

      // Calculate duration based on content width and speed
      // The larger the content, the longer the duration needs to be
      const calculatedDuration = (contentRect.width / speed) * 2
      setDuration(calculatedDuration)
    }
  }, [speed, children])

  // Determine if we need to duplicate content
  const shouldDuplicate = contentWidth < containerWidth * 2

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`} {...props}>
      <motion.div
        ref={contentRef}
        className="flex items-center"
        animate={{
          x: direction === "left" ? [-contentWidth, 0] : [0, -contentWidth],
        }}
        transition={{
          ease: "linear",
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          willChange: "transform",
          minWidth: "max-content",
        }}
        {...(pauseOnHover && {
          whileHover: { animationPlayState: "paused" },
        })}
      >
        {children}
        {shouldDuplicate && children}
      </motion.div>
    </div>
  )
}

export default Marquee

