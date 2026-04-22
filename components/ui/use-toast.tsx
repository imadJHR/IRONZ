"use client"

import * as React from "react"

/**
 * Types and Interfaces
 */
export type ToastVariant = "default" | "destructive"

export interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
}

interface ToastContextType {
  toast: (options: ToastOptions) => void
}

/**
 * Context Initialization
 */
const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

/**
 * Hook to use the Toast system
 */
export function useToast(): ToastContextType {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

/**
 * Provider Component
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback(({ title, description, variant = "default" }: ToastOptions) => {
    const id = Math.random().toString(36).substring(7)
    
    setToasts((prev) => [...prev, { id, title, description, variant }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toastItem) => (
          <div
            key={toastItem.id}
            className={`min-w-[350px] p-4 rounded-lg shadow-lg border transition-all animate-in slide-in-from-right-4 ${
              toastItem.variant === "destructive"
                ? "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50"
                : "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50"
            }`}
          >
            <div className="font-semibold">{toastItem.title}</div>
            {toastItem.description && (
              <div className="text-sm mt-1 opacity-90">{toastItem.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}