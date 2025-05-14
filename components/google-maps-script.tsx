'use client'

import { useEffect, useState } from 'react'

interface GoogleMapsScriptProps {
  apiKey: string
  onLoad?: () => void
}

// Global variable to track if the script is already being loaded
let isLoadingScript = false

export default function GoogleMapsScript({ apiKey, onLoad }: GoogleMapsScriptProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Skip if already loaded
    if (typeof window === 'undefined') return

    if (window.google && window.google.maps) {
      setLoaded(true)
      if (onLoad) onLoad()
      return
    }

    // Skip if no API key or if script is already being loaded
    if (!apiKey || isLoadingScript) return

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
    if (existingScript) {
      // Script exists but might not be loaded yet
      if (!loaded) {
        const checkGoogleMaps = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogleMaps)
            setLoaded(true)
            if (onLoad) onLoad()
          }
        }, 100)

        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkGoogleMaps), 10000)
      }
      return
    }

    // Mark as loading
    isLoadingScript = true

    // Create script element
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`
    script.async = true
    script.defer = true

    // Handle script load
    script.onload = () => {
      setLoaded(true)
      isLoadingScript = false
      if (onLoad) onLoad()
    }

    // Handle script error
    script.onerror = () => {
      console.error('Failed to load Google Maps script')
      isLoadingScript = false
    }

    // Add script to document
    document.head.appendChild(script)

    // Cleanup - but don't remove the script as it should persist
    return () => {}
  }, [apiKey, loaded, onLoad])

  return null
}
