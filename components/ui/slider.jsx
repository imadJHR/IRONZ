"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, value = [], ...props }, ref) => {
  const thumbs = React.useMemo(() => {
    return Array.isArray(value) ? value.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-yellow-500 dark:border-yellow-400 
                   bg-white dark:bg-gray-900 ring-offset-white transition-colors 
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 
                   focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    )) : null;
  }, [value]);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <SliderPrimitive.Range className="absolute h-full bg-yellow-500 dark:bg-yellow-400" />
      </SliderPrimitive.Track>
      {thumbs}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
