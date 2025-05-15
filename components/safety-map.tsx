'use client'

import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/context/language-context'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'
import GoogleMapsScript from './google-maps-script'

// Type definitions for Google Maps API
declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        LatLng: new (lat: number, lng: number) => any;
        InfoWindow: new (options: any) => any;
        SymbolPath: {
          CIRCLE: number;
        };
      };
    };
  }
}

// Simple translations for the map component
const translations = {
  en: {
    loading: "Loading map data...",
    noAlerts: "No alerts in this area"
  },
  ar: {
    loading: "جاري تحميل بيانات الخريطة...",
    noAlerts: "لا توجد تنبيهات في هذه المنطقة"
  }
}

interface SafetyMapProps {
  alerts?: any[]
  userLocation?: { latitude: number | null; longitude: number | null }
  radius?: string
  loading?: boolean
}

export default function SafetyMap({ 
  alerts = [], 
  userLocation = { latitude: null, longitude: null },
  radius = '2',
  loading = false
}: SafetyMapProps) {
  const { language } = useLanguage()
  const t = translations[language]
  
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [mapReady, setMapReady] = useState(false)
  
  // Initialize the map when the component mounts
  useEffect(() => {
    if (typeof window === 'undefined' || !window.google || !window.google.maps) return
    if (!mapRef.current || map) return
    
    // Default center (Cairo)
    const defaultCenter = { lat: 30.0444, lng: 31.2357 }
    
    // Use user location if available
    const center = userLocation.latitude && userLocation.longitude 
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : defaultCenter
    
    const mapOptions = {
      center,
      zoom: 13,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    }
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)
    setMapReady(true)
  }, [map, userLocation])
  
  // Handle Google Maps API loaded event
  const handleGoogleMapsLoaded = () => {
    if (typeof window === 'undefined') return
    
    // Map will be initialized in the useEffect above once Google Maps is loaded
    if (window.google && window.google.maps && mapRef.current && !map) {
      // Force a re-render to trigger the map initialization
      setMapReady(false)
      setTimeout(() => setMapReady(true), 100)
    }
  }
  
  // Update markers when alerts change
  useEffect(() => {
    if (typeof window === 'undefined' || !window.google || !window.google.maps || !map) return
    
    // Clear existing markers
    markers.forEach(marker => {
      if (marker) marker.setMap(null)
    })
    
    const newMarkers: any[] = []
    
    // Add markers for each alert
    alerts.forEach(alert => {
      try {
        const incident = alert.incident
        
        // Check for latitude/longitude and handle different formats
        let latitude, longitude;
        
        if (incident.latitude !== undefined && incident.longitude !== undefined) {
          latitude = parseFloat(incident.latitude);
          longitude = parseFloat(incident.longitude);
        } else if (incident.lat !== undefined && incident.lng !== undefined) {
          latitude = parseFloat(incident.lat);
          longitude = parseFloat(incident.lng);
        } else {
          console.warn('Incident missing coordinates:', incident);
          return;
        }
        
        // Skip invalid coordinates
        if (isNaN(latitude) || isNaN(longitude)) return;
        
        // Determine marker color based on incident type
        let markerColor = '#ef4444'; // Default red
        let incidentIcon = AlertTriangle;
        
        if (alert.isResolved) {
          markerColor = '#10b981'; // Green for resolved
          incidentIcon = CheckCircle;
        } else {
          // Colors for different incident types
          switch(incident.type) {
            case 'PHYSICAL_ABUSE':
              markerColor = '#ef4444'; // Red
              break;
            case 'SEXUAL_ABUSE':
              markerColor = '#7c3aed'; // Purple
              break;
            case 'NEGLECT':
              markerColor = '#f59e0b'; // Amber
              break;
            case 'EMOTIONAL_ABUSE':
              markerColor = '#ec4899'; // Pink
              break;
            case 'PSYCHOLOGICAL_ABUSE':
              markerColor = '#8b5cf6'; // Violet
              break;
            case 'OTHER':
              markerColor = '#6366f1'; // Indigo
              break;
            default:
              markerColor = '#ef4444'; // Red default
          }
        }
        
        // Create marker
        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: incident.location,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: markerColor,
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 8
          }
        })
        
        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px; padding: 5px;">
              <h3 style="margin: 0 0 5px; font-size: 14px;">${incident.location}</h3>
              <p style="margin: 0 0 5px; font-size: 12px; color: ${markerColor};">
                ${incident.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </p>
              <p style="margin: 0; font-size: 12px;">${incident.description}</p>
            </div>
          `
        })
        
        // Add click listener
        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
        
        newMarkers.push(marker)
      } catch (error) {
        console.error('Error creating marker:', error)
      }
    })
    
    setMarkers(newMarkers)
    
    // Cleanup function
    return () => {
      newMarkers.forEach(marker => {
        if (marker) marker.setMap(null)
      })
    }
  }, [alerts, map])
  
  return (
    <div className="w-full h-full">
      {/* Load Google Maps API with your key */}
      <GoogleMapsScript 
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} 
        onLoad={handleGoogleMapsLoaded} 
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          <span className="ml-2 text-muted-foreground">{t.loading}</span>
        </div>
      ) : (
        <>
          {/* This div will hold the map */}
          <div 
            ref={mapRef} 
            className="w-full h-[400px] rounded-md border overflow-hidden"
            style={{ 
              background: typeof window !== 'undefined' && window.google && window.google.maps 
                ? 'transparent' 
                : '#f1f5f9' 
            }}
          >
            {/* Fallback if Google Maps is not available */}
            {typeof window === 'undefined' || !window.google || !window.google.maps ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  {alerts.length > 0 ? (
                    <>
                      <div className="space-y-4 p-4">
                        {alerts.map((alert) => {
                          const incident = alert.incident;
                          
                          // Determine the alert type icon and color
                          let IconComponent = AlertTriangle;
                          let textColorClass = 'text-red-600';
                          
                          if (alert.isResolved) {
                            IconComponent = CheckCircle;
                            textColorClass = 'text-green-600';
                          } else if (incident.type === 'NEGLECT' || incident.type === 'OTHER') {
                            IconComponent = Info;
                            textColorClass = 'text-amber-600';
                          }
                          
                          return (
                            <div key={alert.id} className="flex items-start gap-2">
                              <IconComponent className={`h-5 w-5 ${textColorClass} flex-shrink-0 mt-0.5`} />
                              <div>
                                <p className="text-sm font-medium">
                                  {incident.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {incident.location}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p>{t.noAlerts}</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
