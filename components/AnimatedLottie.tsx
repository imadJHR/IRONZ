// components/AnimatedLottie.tsx
"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import type { PlayerProps } from '@lottiefiles/react-lottie-player';
import { CSSProperties, memo } from 'react';

// Type for component props with sensible defaults
export interface AnimatedLottieProps {
  /** Path to the Lottie JSON animation file (public folder or external URL) */
  src: string;
  /** Container height - accepts CSS units or numbers (pixels) */
  height?: string | number;
  /** Container width - accepts CSS units or numbers (pixels) */
  width?: string | number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether the animation should autoplay on mount */
  autoPlay?: boolean;
  /** Whether the animation should loop continuously */
  loop?: boolean;
  /** Additional props to pass through to the Player component */
  playerProps?: Omit<PlayerProps, 'src' | 'autoplay' | 'loop' | 'style'>;
  /** Inline styles for the container (merged with dimensions) */
  style?: CSSProperties;
  /** Alt text for accessibility */
  alt?: string;
}

const AnimatedLottie = memo(function AnimatedLottie({
  src,
  height = '300px',
  width = '300px',
  className = '',
  autoPlay = true,
  loop = true,
  playerProps = {},
  style = {},
  alt = 'Animation',
}: AnimatedLottieProps) {
  // Normalize dimension values to CSS-compatible strings
  const normalizeDimension = (value: string | number): string => {
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  // Merge container styles
  const containerStyle: CSSProperties = {
    height: normalizeDimension(height),
    width: normalizeDimension(width),
    display: 'inline-block',
    ...style,
  };

  return (
    <div
      className={`lottie-container ${className}`.trim()}
      style={containerStyle}
      role="img"
      aria-label={alt}
    >
      <Player
        autoplay={autoPlay}
        loop={loop}
        src={src}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
        {...playerProps}
      />
    </div>
  );
});

// Set display name for React DevTools
AnimatedLottie.displayName = 'AnimatedLottie';

export default AnimatedLottie;