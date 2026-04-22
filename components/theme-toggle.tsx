"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, MouseEvent } from "react";
import { Sun, Moon, LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
export type ThemeToggleVariant = "icon" | "text" | "switch";

export interface ThemeToggleProps {
  /** Visual style variant of the toggle */
  variant?: ThemeToggleVariant;
  /** Additional CSS classes for the button */
  className?: string;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  /** Optional callback when theme changes */
  onThemeChange?: (newTheme: string) => void;
  /** Show tooltip with current theme name */
  showTooltip?: boolean;
}

export default function ThemeToggle({ 
  variant = "icon", 
  className = "", 
  ariaLabel = "Toggle theme",
  onThemeChange,
  showTooltip = false
}: ThemeToggleProps){
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  // Determine current icon based on resolved theme (accounts for "system" mode)
  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";
  const Icon = isDark ? Sun : Moon;
  const tooltipText = isDark ? "Light mode" : "Dark mode";

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full w-9 h-9 opacity-0 ${className}`}
        disabled
        aria-hidden="true"
      />
    );
  }

  // Render different variants
  if (variant === "text") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${className}`}
        aria-label={ariaLabel}
        title={showTooltip ? tooltipText : undefined}
        type="button"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
      </Button>
    );
  }

  if (variant === "switch") {
    return (
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
          isDark ? "bg-yellow-500" : "bg-gray-300 dark:bg-gray-600"
        } ${className}`}
        role="switch"
        aria-checked={isDark}
        aria-label={ariaLabel}
        title={showTooltip ? tooltipText : undefined}
        type="button"
      >
        <span className="sr-only">{ariaLabel}</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 shadow transition-transform ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
          aria-hidden="true"
        />
      </button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`rounded-full w-9 h-9 text-yellow-400 dark:text-yellow-300 hover:bg-yellow-400/10 dark:hover:bg-yellow-300/10 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${className}`}
      aria-label={ariaLabel}
      title={showTooltip ? tooltipText : undefined}
      type="button"
    >
      <Icon 
        className="h-5 w-5 transition-transform duration-300" 
        aria-hidden="true"
        {...(isDark ? { strokeWidth: 1.5 } : {})}
      />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );
}

// Optional: Utility component for theme-aware content
export function ThemeAwareContent<T>({ 
  light, 
  dark, 
  children 
}: { 
  light: T; 
  dark: T; 
  children?: (value: T) => React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  const value = resolvedTheme === "dark" ? dark : light;
  
  return children ? <>{children(value)}</> : null;
}