"use client";

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProviderProps } from "next-themes";

// Types
export type Theme = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  resolvedTheme?: Theme;
  systemTheme?: Theme;
  themes: string[];
}

export interface ThemeProviderProps extends Omit<NextThemesProviderProps, "children"> {
  children: ReactNode;
  /** Optional: Custom default theme if not provided by next-themes */
  defaultTheme?: Theme;
  /** Optional: Callback when theme changes */
  onThemeChange?: (theme: Theme) => void;
}

// Create context with proper typing
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Custom hook with type-safe return
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};

// Safe hook that returns null instead of throwing (optional alternative)
export const useThemeSafe = (): ThemeContextValue | null => {
  const context = useContext(ThemeContext);
  return context ?? null;
};

export function ThemeProvider({ 
  children, 
  defaultTheme = "light",
  onThemeChange,
  ...props 
}: ThemeProviderProps): JSX.Element {
  const [mounted, setMounted] = useState<boolean>(false);
  const [themeState, setThemeState] = useState<ThemeContextValue>({
    theme: defaultTheme,
    setTheme: () => {},
    themes: ["light", "dark", "system"],
  });

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync with next-themes when available
  useEffect(() => {
    if (!mounted) return;
    
    // Note: next-themes handles persistence automatically
    // This effect is for custom callbacks only
    if (onThemeChange && themeState.theme) {
      onThemeChange(themeState.theme);
    }
  }, [themeState.theme, mounted, onThemeChange]);

  // Wrapper component to bridge next-themes context to our custom context
  const ThemeBridge = ({ children: bridgeChildren }: { children: ReactNode }): JSX.Element => {
    // Use next-themes hook internally if available, otherwise fallback
    const nextThemes = useContext(ThemeContext) as ThemeContextValue | undefined;
    
    const value: ThemeContextValue = nextThemes ?? {
      theme: defaultTheme,
      setTheme: (newTheme: Theme) => {
        setThemeState(prev => ({ ...prev, theme: newTheme }));
        // Also update DOM for immediate feedback
        if (typeof document !== "undefined") {
          const root = document.documentElement;
          if (newTheme === "system") {
            const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.remove("light", "dark");
            root.classList.add(systemPref);
          } else {
            root.classList.remove("light", "dark");
            root.classList.add(newTheme);
          }
        }
      },
      themes: ["light", "dark", "system"],
    };

    return (
      <ThemeContext.Provider value={value}>
        {bridgeChildren}
      </ThemeContext.Provider>
    );
  };

  if (!mounted) {
    // Return children without wrapper to avoid hydration mismatch
    // The theme will be applied on client-side mount
    return <>{children}</>;
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme={defaultTheme} 
      enableSystem 
      {...props}
    >
      <ThemeBridge>
        {children}
      </ThemeBridge>
    </NextThemesProvider>
  );
}

// Optional: Utility function to get system preference
export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? "dark" 
    : "light";
};

// Optional: Hook to listen to system theme changes
export const useSystemTheme = (): Theme => {
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme());

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return systemTheme;
};