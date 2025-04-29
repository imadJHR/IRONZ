// components/AnimatedLottie.jsx
"use client";
import { Player } from '@lottiefiles/react-lottie-player'; // ou ton composant Lottie habituel

export default function AnimatedLottie() {
  return (
    <Player
      autoplay
      loop
      src="/animations/your-animation.json"
      style={{ height: '300px', width: '300px' }}
    />
  );
}
