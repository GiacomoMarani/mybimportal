"use client"

import { useState, useEffect } from "react"

export function DebugMargins() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Aggiungi un listener per la combinazione di tasti Ctrl+Shift+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="h-full w-full border-l-4 border-r-4 border-red-500 opacity-30 max-w-7xl mx-auto"></div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
        Margini di debug (Ctrl+Shift+D per nascondere)
      </div>
    </div>
  )
}
