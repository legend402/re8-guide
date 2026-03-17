"use client"

import { useEffect, useState } from "react"

export function useHighlightOnLoad() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const [highlightTitle, setHighlightTitle] = useState<string | null>(null)

  useEffect(() => {
    // Check for hash in URL
    const hash = window.location.hash.slice(1)
    if (hash) {
      setHighlightedId(hash)
      
      // Scroll to element after a short delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          
          // Add highlight effect
          element.classList.add("ring-4", "ring-amber-500", "ring-opacity-50")
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-amber-500", "ring-opacity-50")
          }, 3000)
        }
      }, 300)
    }

    // Check for highlight target from search
    const targetId = sessionStorage.getItem("re8-highlight-target")
    const targetTitle = sessionStorage.getItem("re8-highlight-title")
    
    if (targetId) {
      setHighlightedId(targetId)
      setHighlightTitle(targetTitle)
      
      // Clear from sessionStorage
      sessionStorage.removeItem("re8-highlight-target")
      sessionStorage.removeItem("re8-highlight-title")
      
      // Scroll and highlight after a short delay
      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          
          // Add highlight effect with animation
          element.classList.add(
            "ring-4", 
            "ring-amber-500", 
            "ring-opacity-70",
            "transition-all",
            "duration-300"
          )
          
          // Create highlight banner
          const banner = document.createElement("div")
          banner.id = "highlight-banner"
          banner.className = `
            fixed top-20 left-1/2 transform -translate-x-1/2 
            z-50 px-4 py-2 bg-amber-500 text-white rounded-full 
            shadow-lg font-medium text-sm
            animate-in fade-in slide-in-from-top-4 duration-300
          `
          banner.textContent = `🔍 ${targetTitle || '搜索结果'}`
          document.body.appendChild(banner)
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-amber-500", "ring-opacity-70")
            
            // Fade out and remove banner
            banner.style.opacity = "0"
            banner.style.transition = "opacity 0.5s"
            setTimeout(() => {
              banner.remove()
            }, 500)
          }, 3000)
        }
      }, 500)
    }
  }, [])

  return { highlightedId, highlightTitle }
}
