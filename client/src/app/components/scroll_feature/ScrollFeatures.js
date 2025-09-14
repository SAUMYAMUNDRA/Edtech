"use client"
import { useState, useEffect } from 'react'

export default function ScrollFeatures() {
  // Progress bar state
  const [progress, setProgress] = useState(0)
  
  // Back to top button state
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let rafId = null

    const onScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        
        // Calculate progress for progress bar
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? Math.min(1, scrollY / total) : 0)
        
        // Show/hide back to top button
        setShowBackToTop(scrollY > 400)
        
        rafId = null
      })
    }

    // Initial call
    onScroll()

    // Add event listeners
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        style={{ transform: `scaleX(${progress})` }}
        className="fixed left-0 top-0 h-1 w-full origin-left bg-yellow-500 z-[9999] transition-transform duration-150 ease-out"
        aria-hidden="true"
      />

      {/* Back to Top Button */}
      <button
        aria-label="Scroll to top"
        onClick={handleBackToTop}
        className={`fixed bottom-6 right-6 z-50 rounded-full shadow-xl bg-yellow-500 text-white w-12 h-12 flex items-center justify-center transition-all duration-300 ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        } hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </>
  )
}