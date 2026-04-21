"use client";

import { useRef, useEffect, useState, ReactNode, HTMLAttributes } from "react";
import { motion, MotionProps, AnimationControls, TargetAndTransition } from "framer-motion";

// Types
export type MarqueeDirection = "left" | "right";

export interface MarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onAnimationStart" | "onAnimationEnd"> {
  /** Content to scroll in the marquee */
  children: ReactNode;
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Scroll speed in pixels per second */
  speed?: number;
  /** Pause animation when hovering */
  pauseOnHover?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional props to pass to the motion.div content wrapper */
  contentProps?: Omit<MotionProps, "animate" | "transition" | "style" | "whileHover">;
}

export const Marquee = ({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
  contentProps = {},
  ...props
}: MarqueeProps): JSX.Element => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const updateDimensions = () => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();

        if (containerRect && contentRect) {
          setContainerWidth(containerRect.width);
          setContentWidth(contentRect.width);
          
          // Calculate duration based on content width and speed
          // Duration = distance / speed, multiplied by 2 for seamless loop
          const calculatedDuration = contentRect.width > 0 
            ? (contentRect.width / speed) * 2 
            : 0;
          setDuration(calculatedDuration);
        }
      };

      updateDimensions();
      
      // Re-calculate on resize
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [speed, children]);

  // Determine if we need to duplicate content for seamless looping
  // Duplicate when content is smaller than 2x container to ensure no gaps
  const shouldDuplicate = contentWidth > 0 && contentWidth < containerWidth * 2;

  // Animation configuration
  const animateConfig: TargetAndTransition = {
    x: direction === "left" 
      ? [-contentWidth, 0] 
      : [0, contentWidth > 0 ? -contentWidth : 0],
  };

  const transitionConfig = {
    ease: "linear" as const,
    duration: duration > 0 ? duration : 1,
    repeat: Infinity,
    repeatType: "loop" as const,
  };

  // Handle hover pause with proper Framer Motion approach
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        ref={contentRef}
        className="flex items-center whitespace-nowrap"
        animate={animateConfig}
        transition={transitionConfig}
        style={{
          willChange: "transform",
          minWidth: "max-content",
        }}
        // Pause animation when hovered (Framer Motion compatible)
        {...(pauseOnHover && {
          animate: isPaused ? { x: "0px" } : animateConfig,
          transition: isPaused ? { duration: 0 } : transitionConfig,
        })}
        {...contentProps}
      >
        {/* Render children twice for seamless infinite scroll */}
        {children}
        {shouldDuplicate && children}
      </motion.div>
    </div>
  );
};

Marquee.displayName = "Marquee";

export default Marquee;